import { fetchIssue } from '../tools/jiraClient.js';
import { generateTestStrategy, renderMarkdown } from '../tools/testStrategy.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    const { jiraId, config: bodyConfig = {} } = req.body;
    if (!jiraId) return res.status(400).json({ error: 'Missing jiraId' });

    const config = {
      jiraUrl: (bodyConfig.jiraUrl || '').trim() || process.env.JIRA_URL || '',
      jiraEmail: (bodyConfig.jiraEmail || '').trim() || process.env.JIRA_EMAIL || '',
      jiraToken: (bodyConfig.jiraToken || '').trim() || process.env.JIRA_API_TOKEN || process.env.JIRA_TOKEN || '',
      groqKey: (bodyConfig.groqKey || '').trim() || process.env.GROQ_KEY || '',
    };

    const issue = await fetchIssue(config, jiraId);
    const strategy = await generateTestStrategy(config, issue);
    const markdown = renderMarkdown(strategy);

    res.status(200).json({ issue, strategy, markdown });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
