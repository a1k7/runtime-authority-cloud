import React from 'react';
import { motion } from 'framer-motion';

function AuthorityDrift({ drifts, full }) {
  const displayDrifts = full ? drifts : drifts.slice(0, 3);

  const driftIcons = {
    'policy_drift': '📋',
    'delegation_drift': '🔗',
    'evidence_drift': '⏰',
    'identity_drift': '🆔'
  };

  const severityColors = {
    'policy_drift': '#fdcb6e',
    'delegation_drift': '#e17055',
    'evidence_drift': '#fd79a8',
    'identity_drift': '#6c5ce7'
  };

  return (
    <motion.div 
      className="card authority-drift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="card-header">
        <h3>Authority Drift</h3>
        <span className="card-badge">{drifts.length} detected</span>
      </div>
      
      <div className="card-body">
        {drifts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✅</span>
            <p>No drift detected</p>
          </div>
        ) : (
          <div className="drift-list">
            {displayDrifts.map((drift, index) => (
              <motion.div 
                key={index} 
                className="drift-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="drift-icon">{driftIcons[drift.type] || '⚠️'}</div>
                <div className="drift-content">
                  <div className="drift-header">
                    <span className="drift-type">{drift.type.replace('_', ' ').toUpperCase()}</span>
                    <span className="drift-step">Step {drift.step}</span>
                  </div>
                  <div className="drift-details">
                    <span className="drift-from">{drift.from}</span>
                    <span className="drift-arrow">→</span>
                    <span className="drift-to">{drift.to}</span>
                  </div>
                  <div className="drift-timestamp">{drift.timestamp}</div>
                </div>
                <div className="drift-severity" style={{ backgroundColor: severityColors[drift.type] || '#6a6a8a' }}></div>
              </motion.div>
            ))}
          </div>
        )}
        
        {!full && drifts.length > 3 && (
          <div className="drift-more">
            +{drifts.length - 3} more drifts
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AuthorityDrift;