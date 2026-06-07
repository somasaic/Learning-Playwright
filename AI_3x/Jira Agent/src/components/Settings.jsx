import { useState } from 'react';

export default function Settings({ config, onSave }) {
  const [local, setLocal] = useState(config);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="panel">
      <h2>⚙️ Settings</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Stored locally in your browser. Blank fields fall back to the server <code>.env</code>.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Jira Base URL</label>
          <input 
            type="url" 
            value={local.jiraUrl || ''} 
            onChange={e => setLocal({...local, jiraUrl: e.target.value})}
            placeholder="https://your-domain.atlassian.net" 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Jira Email</label>
          <input 
            type="email" 
            value={local.jiraEmail || ''} 
            onChange={e => setLocal({...local, jiraEmail: e.target.value})}
            placeholder="you@example.com" 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Jira API Token</label>
          <input 
            type="password" 
            value={local.jiraToken || ''} 
            onChange={e => setLocal({...local, jiraToken: e.target.value})}
            placeholder="ATATT..." 
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label>GROQ API Key</label>
          <input 
            type="password" 
            value={local.groqKey || ''} 
            onChange={e => setLocal({...local, groqKey: e.target.value})}
            placeholder="gsk_..." 
          />
        </div>

        <button type="submit">{saved ? '✅ Saved!' : 'Save settings'}</button>
      </form>
    </div>
  );
}
