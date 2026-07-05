import React from 'react';
import { motion } from 'framer-motion';

function AuthorityDNA({ data }) {
  const items = [
    { key: 'identity', label: 'Identity', status: data.identity.status, value: data.identity.value },
    { key: 'delegation', label: 'Delegation', status: data.delegation.status, value: data.delegation.value },
    { key: 'evidence', label: 'Evidence', status: data.evidence.status, value: data.evidence.value },
    { key: 'policy', label: 'Policy', status: data.policy.status, value: data.policy.value },
    { key: 'capability', label: 'Capability', status: data.capability.status, value: data.capability.value },
  ];

  const statusColors = {
    'Verified': '#00b894',
    'Broken': '#e17055',
    'Expired': '#e17055',
    'Updated': '#fdcb6e',
    'Restricted': '#e17055'
  };

  const statusLabels = {
    'Verified': '✅',
    'Broken': '❌',
    'Expired': '⏰',
    'Updated': '📋',
    'Restricted': '🔒'
  };

  return (
    <motion.div 
      className="card authority-dna"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="card-header">
        <h3>🧬 Authority DNA</h3>
      </div>
      
      <div className="card-body">
        <div className="dna-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '8px'
        }}>
          {items.map((item, index) => (
            <motion.div 
              key={item.key}
              className="dna-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span style={{ fontSize: '12px', color: '#a0a0b8', width: '80px', flexShrink: 0 }}>
                {item.label}
              </span>
              <div style={{ flex: 1, height: '8px', background: '#1a1a2e', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  borderRadius: '4px',
                  width: `${item.value}%`,
                  background: item.value >= 70 ? 'linear-gradient(90deg, #00b894, #00cec9)' :
                             item.value >= 40 ? 'linear-gradient(90deg, #fdcb6e, #e17055)' :
                             'linear-gradient(90deg, #e17055, #c0392b)',
                  transition: 'width 1s ease'
                }} />
              </div>
              <span style={{ fontSize: '12px', color: statusColors[item.status], width: '70px', textAlign: 'right', flexShrink: 0 }}>
                {statusLabels[item.status]} {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AuthorityDNA;