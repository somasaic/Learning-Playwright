// Layer 2 — Navigation. Express proxy for local development.
// Routes requests -> jiraClient -> testPlan/testStrategy(groqClient) -> response.
import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchIssue } from './tools/jiraClient.js';
import { generateTestPlan, renderMarkdown as renderPlanMarkdown } from './tools/testPlan.js';
import { generateTestStrategy, renderMarkdown as renderStrategyMarkdown } from './tools/testStrategy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 8787;
const app = express();
app.use(express.json({ limit: '1mb' }));

function envConfig() {
  return {
    jiraUrl: process.env.JIRA_URL || '',
    jiraEmail: process.env.JIRA_EMAIL || '',
    jiraToken: process.env.JIRA_API_TOKEN || process.env.JIRA_TOKEN || '',
    groqKey: process.env.GROQ_KEY || '',
  };
}

function mergeConfig(body = {}) {
  const env = envConfig();
  const c = body.config || {};
  return {
    jiraUrl: (c.jiraUrl || '').trim() || env.jiraUrl,
    jiraEmail: (c.jiraEmail || '').trim() || env.jiraEmail,
    jiraToken: (c.jiraToken || '').trim() || env.jiraToken,
    groqKey: (c.groqKey || '').trim() || env.groqKey,
  };
}

// GET /api/config - Returns which config fields are present (never sends secrets)
app.get('/api/config', (req, res) => {
  const e = envConfig();
  res.json({
    jiraUrl: e.jiraUrl,
    jiraEmail: e.jiraEmail,
    hasJiraToken: Boolean(e.jiraToken),
    hasGroqKey: Boolean(e.groqKey),
  });
});

// POST /api/generate-plan
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { jiraId } = req.body;
    if (!jiraId) return res.status(400).json({ error: 'Missing jiraId' });
    const config = mergeConfig(req.body);
    const issue = await fetchIssue(config, jiraId);
    const plan = await generateTestPlan(config, issue);
    const markdown = renderPlanMarkdown(plan);
    res.json({ issue, plan, markdown });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/generate-strategy
app.post('/api/generate-strategy', async (req, res) => {
  try {
    const { jiraId } = req.body;
    if (!jiraId) return res.status(400).json({ error: 'Missing jiraId' });
    const config = mergeConfig(req.body);
    const issue = await fetchIssue(config, jiraId);
    const strategy = await generateTestStrategy(config, issue);
    const markdown = renderStrategyMarkdown(strategy);
    res.json({ issue, strategy, markdown });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 B.L.A.S.T. Proxy running on http://localhost:${PORT}`);
});
