// Layer 3 Tool — Jira issue fetch + normalize. Atomic, deterministic.
// Ported from Pramod's repo with full ADF support.

/**
 * Recursively flatten Atlassian Document Format (ADF) into plain text.
 * Jira Cloud returns rich descriptions as ADF JSON; we need plain text for LLM prompts.
 */
function flattenAdf(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(flattenAdf).join('');

  let text = '';
  if (node.type === 'text' && typeof node.text === 'string') text += node.text;
  if (node.content) text += flattenAdf(node.content);

  // Add line breaks around block-level nodes so the text stays readable.
  if (['paragraph', 'heading', 'listItem', 'blockquote', 'bulletList', 'orderedList'].includes(node.type)) {
    text += '\n';
  }
  if (node.type === 'hardBreak' || node.type === 'rule') text += '\n';
  return text;
}

/**
 * Normalize raw Jira API response into a flat, clean object for prompts.
 */
export function normalizeIssue(raw) {
  const f = raw.fields || {};
  const description = typeof f.description === 'string'
    ? f.description
    : flattenAdf(f.description).replace(/\n{3,}/g, '\n\n').trim();

  return {
    key: raw.key,
    summary: f.summary || '',
    description: description || '',
    issueType: f.issuetype?.name || '',
    status: f.status?.name || '',
    priority: f.priority?.name || '',
    components: (f.components || []).map(c => c.name),
    labels: f.labels || [],
    fixVersions: (f.fixVersions || []).map(v => v.name),
    reporter: f.reporter?.displayName || '',
    assignee: f.assignee?.displayName || '',
    created: f.created || '',
    updated: f.updated || '',
  };
}

/**
 * Fetch a Jira issue by key and return normalized data.
 * Uses Basic auth (email:token) against Jira Cloud REST API v3.
 */
export async function fetchIssue(config, issueKey) {
  const { jiraUrl, jiraEmail, jiraToken } = config;
  if (!jiraUrl || !jiraEmail || !jiraToken) {
    throw new Error('Missing Jira configuration (URL, email, or API token).');
  }

  const base = jiraUrl.replace(/\/+$/, '');
  const url = `${base}/rest/api/3/issue/${encodeURIComponent(issueKey)}`;
  const auth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64');

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Jira ${res.status}: ${body.slice(0, 300)}`);
  }

  const raw = await res.json();
  return normalizeIssue(raw);
}
