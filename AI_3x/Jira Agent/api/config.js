export default function handler(req, res) {
  res.status(200).json({
    jiraUrl: process.env.JIRA_URL || '',
    jiraEmail: process.env.JIRA_EMAIL || '',
    hasJiraToken: Boolean(process.env.JIRA_API_TOKEN || process.env.JIRA_TOKEN),
    hasGroqKey: Boolean(process.env.GROQ_KEY),
  });
}
