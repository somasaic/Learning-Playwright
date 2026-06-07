export default function ToolSelector({ activeTab, onChange }) {
  const tabs = [
    { id: 'plan', label: '📋 Test Plan Generator' },
    { id: 'strategy', label: '🎯 Test Strategy Buddy' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
