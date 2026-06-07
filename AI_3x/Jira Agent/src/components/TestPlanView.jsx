export default function TestPlanView({ result }) {
  const download = () => {
    const blob = new Blob([result.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.plan.testPlanId || 'Test-Plan'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--success)' }}>✅ Generation Complete</h3>
        <button onClick={download} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          ⬇️ Download .md
        </button>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h4>Jira Issue Context</h4>
        <p><strong>{result.issue.key}:</strong> {result.issue.summary}</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {result.issue.issueType} | {result.issue.status} | Assignee: {result.issue.assignee || 'Unassigned'}
        </p>
      </div>

      <div className="markdown" dangerouslySetInnerHTML={{ __html: parseSimpleMarkdown(result.markdown) }} />
    </div>
  );
}

// Simple internal markdown parser for preview
function parseSimpleMarkdown(md) {
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/\n\n/gim, '<p></p>')
    .replace(/^---/gim, '<hr />');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/gim, '\n');

  // Basic Tables (very simple parser just for preview)
  html = html.replace(/^\|(.*)\|$/gim, (match, content) => {
    if (content.includes('---')) return ''; // skip separator
    const cells = content.split('|').map(c => c.trim());
    return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
  });
  html = html.replace(/(<tr>.*<\/tr>)/gim, '<table border="1">$1</table>');
  html = html.replace(/<\/table>\n<table border="1">/gim, '\n');

  return html;
}
