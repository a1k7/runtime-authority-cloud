import React from 'react';
import { motion } from 'framer-motion';

function DriftSummary({ data, full }) {
  const driftItems = [
    { key: 'policy', label: 'Policy', status: data.policy, value: data.policy === 'Major' ? 90 : data.policy === 'Minor' ? 50 : data.policy === 'Detected' ? 30 : 10 },
    { key: 'capability', label: 'Capability', status: data.capability, value: data.capability === 'Detected' ? 60 : 10 },
    { key: 'delegation', label: 'Delegation', status: data.delegation, value: data.delegation === 'Minor' ? 40 : data.delegation === 'Major' ? 80 : 10 },
    { key: 'evidence', label: 'Evidence', status: data.evidence, value: data.evidence === 'Expired' ? 70 : 10 },
    { key: 'identity', label: 'Identity', status: data.identity, value: data.identity === 'Detected' ? 30 : 10 },
  ];

  const statusColors = {
    'None': '#00b894',
    'Detected': '#fdcb6e',
    'Major': '#e17055',
    'Minor': '#fdcb6e',
    'Expired': '#e17055'
  };

  const overallLevels = { 'LOW': 'low', 'MEDIUM': 'medium', 'HIGH': 'high' };

  return (
    <div className={`card drift-summary ${full ? 'full-width' : ''}`}>
      <div className="card-header">
        <h3>🔄 Drift Summary</h3>
        <span className="card-badge" style={{
          background: data.overall === 'HIGH' ? 'rgba(225,112,85,0.2)' : 'rgba(0,184,148,0.2)',
          color: data.overall === 'HIGH' ? '#e17055' : '#00b894',
          border: data.overall === 'HIGH' ? '1px solid rgba(225,112,85,0.3)' : '1px solid rgba(0,184,148,0.3)'
        }}>
          Overall: {data.overall}
        </span>
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {driftItems.map((item, index) => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: '#a0a0b8', width: '80px', flexShrink: 0 }}>
                {item.label}
              </span>
              <div style={{ flex: 1, height: '20px', background: '#1a1a2e', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ 
                    height: '100%', 
                    background: statusColors[item.status],
                    borderRadius: '4px',
                  }}
                />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '500', color: statusColors[item.status], width: '70px', textAlign: 'right', flexShrink: 0 }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="drift-primary" style={{ marginTop: '12px' }}>
          <div className="drift-cause">Primary Cause: {data.primaryCause || 'No drift detected'}</div>
          {data.overall !== 'LOW' && (
            <div className="drift-meta">Confidence: 97% · Affected agents: 14</div>
          )}
        </div>

        <div className={`drift-overall ${overallLevels[data.overall] || 'low'}`} style={{
          textAlign: 'center', marginTop: '12px', padding: '8px', borderRadius: '10px',
          fontWeight: '600', fontSize: '14px',
          background: data.overall === 'HIGH' ? 'rgba(225,112,85,0.1)' : 'rgba(0,184,148,0.1)',
          color: data.overall === 'HIGH' ? '#e17055' : '#00b894',
          border: data.overall === 'HIGH' ? '1px solid rgba(225,112,85,0.2)' : '1px solid rgba(0,184,148,0.2)'
        }}>
          Overall Risk: {data.overall}
        </div>
      </div>
    </div>
  );
}

export default DriftSummary;