import React from 'react';
import { motion } from 'framer-motion';

function LiveSystems({ systems, full }) {
  const displaySystems = full ? systems : systems.slice(0, 6);
  const healthDots = { 'active': '🟢', 'warning': '🟡', 'inactive': '⚫' };

  return (
    <div className={`card live-systems ${full ? 'full-width' : ''}`}>
      <div className="card-header">
        <h3>⚡ Live Systems</h3>
        <span className="card-badge">{systems.filter(s => s.status === 'active').length} active</span>
      </div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {displaySystems.map((system, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 10px', background: '#1a1a2e', borderRadius: '6px',
              fontSize: '12px', color: '#a0a0b8'
            }}>
              <span style={{ fontSize: '14px' }}>{healthDots[system.status]}</span>
              <span style={{ flex: 1 }}>{system.name}</span>
              <span style={{
                fontSize: '10px',
                color: system.status === 'active' ? '#00b894' : 
                       system.status === 'warning' ? '#fdcb6e' : '#4a4a6a'
              }}>{system.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveSystems;