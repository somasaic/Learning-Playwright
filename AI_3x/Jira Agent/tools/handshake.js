// Layer 3 Tool — Connection handshake. Verifies Jira + GROQ before full usage.
// Run: node tools/handshake.js

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const config = {
  jiraUrl: process.env.JIRA_URL || '',
  jiraEmail: process.env.JIRA_EMAIL || '',
  jiraToken: process.env.JIRA_API_TOKEN || process.env.JIRA_TOKEN || '',
  groqKey: process.env.GROQ_KEY || '',
};

async function checkJira() {
  if (!config.jiraUrl || !config.jiraEmail || !config.jiraToken) {
    return { ok: false, error: 'Missing JIRA_URL, JIRA_EMAIL, or JIRA_API_TOKEN in .env' };
  }
  try {
    const base = config.jiraUrl.replace(/\/+$/, '');
    const auth = Buffer.from(`${config.jiraEmail}:${config.jiraToken}`).toString('base64');
    const res = await fetch(`${base}/rest/api/3/myself`, {
      headers: { Authorization: `Basic ${auth}`, Accept: 'application/json' },
    });
    if (!res.ok) return { ok: false, error: `Jira ${res.status}` };
    const me = await res.json();
    return { ok: true, user: me.displayName, email: me.emailAddress };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function checkGroq() {
  if (!config.groqKey) {
    return { ok: false, error: 'Missing GROQ_KEY in .env' };
  }
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${config.groqKey}` },
    });
    if (!res.ok) return { ok: false, error: `GROQ ${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

console.log('\n🔗 B.L.A.S.T. Phase 2 — Link (Handshake)\n');

const [jira, groq] = await Promise.all([checkJira(), checkGroq()]);

console.log(`  Jira : ${jira.ok ? '✅' : '❌'}  ${jira.ok ? `Connected as ${jira.user} (${jira.email})` : jira.error}`);
console.log(`  GROQ : ${groq.ok ? '✅' : '❌'}  ${groq.ok ? 'API key valid' : groq.error}`);
console.log();

if (!jira.ok || !groq.ok) {
  console.log('⚠️  Fix the above issues before proceeding.\n');
  process.exit(1);
} else {
  console.log('🎉  All connections verified. Ready to build.\n');
}
