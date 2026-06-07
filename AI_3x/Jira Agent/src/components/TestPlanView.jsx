import { useState } from 'react';

export default function TestPlanView({ result }) {
  const [copied, setCopied] = useState(false);

  const download = () => {
    const blob = new Blob([result.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.plan.testPlanId || 'Test-Plan'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = () => {
    navigator.clipboard.writeText(result.markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h3 style={{ color: 'var(--success)' }}>✅ Generation Complete</h3>
        <div className="action-row">
          <button onClick={copy} className="btn-ghost">{copied ? '✅ Copied!' : '📋 Copy Markdown'}</button>
          <button onClick={download} className="btn-ghost">⬇️ Download .md</button>
        </div>
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

function parseSimpleMarkdown(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table block: collect all | lines together
    if (/^\|/.test(line)) {
      const tableLines = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      // First row = header, second = separator, rest = body
      const [header, , ...body] = tableLines;
      const thCells = header.split('|').filter((_, j, a) => j > 0 && j < a.length - 1).map(c => `<th>${inline(c.trim())}</th>`).join('');
      const bodyRows = body.map(r => {
        const cells = r.split('|').filter((_, j, a) => j > 0 && j < a.length - 1).map(c => `<td>${inline(c.trim())}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      out.push(`<table><thead><tr>${thCells}</tr></thead><tbody>${bodyRows}</tbody></table>`);
      continue;
    }

    // Bullet list: collect consecutive items
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) {
        items.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^### /.test(line)) { out.push(`<h3>${inline(line.slice(4))}</h3>`); }
    else if (/^## /.test(line)) { out.push(`<h2>${inline(line.slice(3))}</h2>`); }
    else if (/^# /.test(line)) { out.push(`<h1>${inline(line.slice(2))}</h1>`); }
    else if (/^---/.test(line)) { out.push('<hr />'); }
    else if (line.trim() === '') { out.push('<br />'); }
    else { out.push(`<p>${inline(line)}</p>`); }
    i++;
  }

  return out.join('\n');
}

function inline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}
