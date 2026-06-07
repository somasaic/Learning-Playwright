export default function handler(req, res) {
  const e = {
    jiraUrl: process.env.JIRA_URL || '',
    jiraEmail: process.env.JIRA_EMAIL || '',
    jiraToken: process.env.JIRA_API_TOKEN || process.env.JIRA_TOKEN || '',
    groqKey: process.env.GROQ_KEY || '',
  };
  
  res.status(200).json({
    jiraUrl: e.jiraUrl,
    jiraEmail: e.jiraEmail,
    hasJiraToken: Boolean(e.jiraToken),
    hasGroqKey: Boolean(e.groqKey),
  });
}
