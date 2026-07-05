import React, { useState } from 'react';

function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const allSuggestions = [
    { icon: '🔍', text: 'Why was execution denied?' },
    { icon: '🔍', text: 'Show expired evidence' },
    { icon: '🔍', text: 'Find authority with highest drift' },
    { icon: '🔁', text: 'Replay AUTH-847238' },
    { icon: '📋', text: 'Show all policy changes today' },
    { icon: '📊', text: 'Show trace TRACE-ABC123' },
    { icon: '🔄', text: 'Show drift events' },
    { icon: '🔗', text: 'Delegation changes' },
    { icon: '🆔', text: 'Authority ID AUTH-847238' },
    { icon: '📄', text: 'Export report' },
    { icon: '🔐', text: 'Verify certificate' },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filtered = allSuggestions.filter(s =>
        s.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (text) => {
    setQuery(text);
    setSuggestions([]);
  };

  return (
    <div className="global-search" style={{ marginBottom: '20px', position: 'relative' }}>
      <span className="search-icon">🔍</span>
      <input 
        type="text"
        placeholder="Ask about authority, drift, replay, or policies..."
        value={query}
        onChange={handleSearch}
        onFocus={() => {
          if (query.length > 1) {
            const filtered = allSuggestions.filter(s =>
              s.text.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
          }
        }}
        onBlur={() => setTimeout(() => setSuggestions([]), 200)}
        style={{
          background: 'none',
          border: 'none',
          color: '#e8e8f0',
          fontSize: '13px',
          padding: '6px 0',
          width: '100%',
          fontFamily: 'Inter, sans-serif'
        }}
      />
      <span className="shortcut">⌘K</span>
      {suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#12121f',
          border: '1px solid #2a2a44',
          borderRadius: '8px',
          marginTop: '4px',
          padding: '8px',
          zIndex: 100,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {suggestions.map((s, idx) => (
            <div key={idx} style={{
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              color: '#a0a0b8',
              fontSize: '13px'
            }}
            onMouseEnter={(e) => e.target.style.background = '#1a1a2e'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            onClick={() => selectSuggestion(s.text)}>
              <span>{s.icon}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;