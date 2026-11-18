import type { GroqModel, LLMModel } from "../../types.ts";
import type { ProviderCall, ProviderCallInput } from "../llmClient.ts";

// Groq expone un endpoint OpenAI-compatible: POST /openai/v1/chat/completions.
// Sin prompt caching por ahora — se envía systemStable + systemDynamic concatenados como un solo system message.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/*
  Groq retira modelos con fecha, y llegada esa fecha la API deja de servirlos.
  `llama-3.3-70b-versatile` —el `fast` de todos los clientes desde el arranque—
  y `llama-3.1-8b-instant` se apagaron el 2026-08-16; `llama-3.1-70b-versatile`
  y `mixtral-8x7b-32768`, que también estaban en esta lista, se habían apagado
  en 2025. Ninguno avisa: no hay error de typecheck ni de build, el agente sigue
  corriendo y cada llamada cae a Claude Haiku (más caro) con un warning en el
  correo. Fuente: https://console.groq.com/docs/deprecations

  Por eso aquí hay una LISTA ordenada y no un modelo suelto. El que pide el
  manifiesto va primero; si falla por algo que depende del modelo (no existe, lo
  retiraron, está saturado, se pasó del límite de tokens por minuto, devolvió la
  respuesta vacía), se prueba el siguiente dentro de la MISMA llamada. Solo si se
  agotan todos sube el error y `generateWithFallback` cae a Claude.

  Los dos son los reemplazos que recomienda la propia Groq: `openai/gpt-oss-120b`
  para Llama 3.3 70B y `openai/gpt-oss-20b` para Llama 3.1 8B. No se añade ningún
  modelo en "preview": Groq los puede quitar sin el aviso de fecha.

  Al cambiar esta lista, se cambia también el union `GroqModel` en `types.ts`,
  el `fast` de `agent/clients/*.yml` y la plantilla de `AUTOMATION_ACTIONS.md`.
*/
export const GROQ_MODELS: readonly GroqModel[] = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

/*
  Los dos razonan antes de responder, y esos tokens de razonamiento salen del
  mismo `max_tokens` que la respuesta. Con los topes que piden las capabilities
  (900 en insights_digest, 1200 en market_trends_scan) la respuesta podía llegar
  cortada o vacía. El margen se suma al tope pedido en vez de reemplazarlo: el
  largo de la respuesta lo sigue marcando la capability.
*/
const REASONING_MODELS: ReadonlySet<GroqModel> = new Set(GROQ_MODELS);
const REASONING_HEADROOM = 2048;

const esModeloVigente = (m: LLMModel): m is GroqModel => (GROQ_MODELS as readonly string[]).includes(m);

/** El pedido primero y después el resto de la lista, sin repetir. */
export function modelosAProbar(pedido: GroqModel): GroqModel[] {
  return [pedido, ...GROQ_MODELS.filter((m) => m !== pedido)];
}

type Intento = { ok: true; text: string } | { ok: false; error: string };

async function pedirA(
  model: GroqModel,
  apiKey: string,
  systemContent: string,
  input: ProviderCallInput,
): Promise<Intento> {
  const maxTokens = REASONING_MODELS.has(model) ? input.maxTokens + REASONING_HEADROOM : input.maxTokens;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: input.userPrompt },
      ],
    }),
  });

  /*
    401/403 no dependen del modelo: es la llave, o el sandbox que no deja salir
    a api.groq.com ("Host not in allowlist"). Probar otro modelo daría el mismo
    error, así que se corta la cadena aquí y se pasa directo al fallback.
  */
  if (res.status === 401 || res.status === 403) {
    const body = await res.text();
    throw new Error(`Groq API ${res.status}: ${body}`);
  }

  if (!res.ok) {
    const body = await res.text();
    return { ok: false, error: `Groq API ${res.status}: ${body.slice(0, 300)}` };
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const text = (json.choices?.[0]?.message?.content ?? "").trim();

  /*
    Un modelo que razona puede gastarse el presupuesto pensando y devolver
    `content` vacío. Una cadena vacía no sirve a ninguna capability (el JSON de
    market_trends_scan no parsea, el digest sale en blanco): cuenta como fallo y
    le toca al siguiente modelo.
  */
  if (!text) return { ok: false, error: "respuesta vacía" };

  return { ok: true, text };
}

export const callGroq: ProviderCall = async (input) => {
  if (!esModeloVigente(input.model)) {
    throw new Error(
      `Modelo Groq no reconocido o retirado: ${input.model}. Vigentes: ${GROQ_MODELS.join(", ")}. ` +
        "Corrige el bloque `llm.fast` del manifiesto (agent/clients/<id>.yml).",
    );
  }
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY no está definida");

  const systemContent = input.systemDynamic
    ? `${input.systemStable}\n\n---\n\n${input.systemDynamic}`
    : input.systemStable;

  const fallos: string[] = [];
  for (const model of modelosAProbar(input.model)) {
    const intento = await pedirA(model, apiKey, systemContent, input);
    if (intento.ok) return intento.text;
    fallos.push(`${model} → ${intento.error}`);
  }
  throw new Error(`Ningún modelo de Groq respondió: ${fallos.join(" · ")}`);
};
