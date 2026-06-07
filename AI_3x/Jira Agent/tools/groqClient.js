// Layer 3 Tool — GROQ chat completion (OpenAI-compatible). Atomic.
// Uses the free openai/gpt-oss-120b model.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
export const GROQ_MODEL = 'openai/gpt-oss-120b';

// Models known to support json_object response_format on Groq.
const JSON_MODE_SUPPORTED = new Set([
  'openai/gpt-oss-120b',
  'llama-3.3-70b-versatile',
  'llama-3.1-70b-versatile',
  'llama-3.1-8b-instant',
  'mixtral-8x7b-32768',
]);

/**
 * Send a chat completion request to GROQ.
 * @param {object} config - must include groqKey
 * @param {Array}  messages - OpenAI-style messages array
 * @param {object} opts - { json: true, temperature: 0.3 }
 * @returns {string} raw content from the model
 */
export async function groqChat(config, messages, { json = true, temperature = 0.3 } = {}) {
  if (!config.groqKey) throw new Error('Missing GROQ API key.');

  const body = { model: GROQ_MODEL, messages, temperature };
  if (json && JSON_MODE_SUPPORTED.has(GROQ_MODEL)) {
    body.response_format = { type: 'json_object' };
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.groqKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`GROQ ${res.status}: ${txt.slice(0, 400)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}
