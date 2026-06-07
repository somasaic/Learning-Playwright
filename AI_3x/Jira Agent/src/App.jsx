import { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle.jsx';
import ToolSelector from './components/ToolSelector.jsx';
import Settings from './components/Settings.jsx';
import Generator from './components/Generator.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('plan'); // plan | strategy | settings
  const [config, setConfig] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('jira_agent_config')) || {};
    } catch {
      return {};
    }
  });

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('jira_agent_config', JSON.stringify(newConfig));
  };

  return (
    <div className="container">
      <header>
        <h1>JIRA Agent Platform</h1>
        <ThemeToggle />
      </header>

      <ToolSelector activeTab={activeTab} onChange={setActiveTab} />

      <main>
        {activeTab === 'settings' && (
          <Settings config={config} onSave={saveConfig} />
        )}
        
        {activeTab === 'plan' && (
          <Generator 
            toolType="plan" 
            config={config} 
            title="Test Plan Generator" 
            description="Generate a detailed Test Plan (WHEN & HOW) for a Jira issue."
          />
        )}

        {activeTab === 'strategy' && (
          <Generator 
            toolType="strategy" 
            config={config} 
            title="Test Strategy Buddy" 
            description="Generate a high-level Test Strategy (WHAT & WHY) for a Jira issue."
          />
        )}
      </main>
    </div>
  );
}

export default App;
