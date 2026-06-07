import { useState } from 'react';
import { apiCall } from '../lib/api.js';
import TestPlanView from './TestPlanView.jsx';
import TestStrategyView from './TestStrategyView.jsx';

export default function Generator({ toolType, config, title, description }) {
  const [jiraId, setJiraId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!jiraId) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const endpoint = toolType === 'plan' ? 'generate-plan' : 'generate-strategy';
      const data = await apiCall(endpoint, { jiraId, config });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="panel">
        <h2>{title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{description}</p>
        
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <input 
              type="text" 
              value={jiraId} 
              onChange={e => setJiraId(e.target.value.toUpperCase())}
              placeholder="Enter Jira ID (e.g. ECOM-1)" 
              disabled={loading}
              style={{ marginTop: 0, marginBottom: 0 }}
            />
          </div>
          <button type="submit" disabled={loading || !jiraId}>
            {loading ? 'Generating...' : 'Generate 🚀'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '8px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {result && (
        <div className="panel">
          {toolType === 'plan' ? (
            <TestPlanView result={result} />
          ) : (
            <TestStrategyView result={result} />
          )}
        </div>
      )}
    </div>
  );
}
