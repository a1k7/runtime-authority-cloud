import React from 'react';
import { motion } from 'framer-motion';

function AuthorityLifecycle({ steps, full }) {
  const displaySteps = full ? steps : steps.slice(0, 5);

  const statusIcons = {
    'success': '✅',
    'warning': '⚠️',
    'danger': '❌',
    'info': 'ℹ️'
  };

  const statusColors = {
    'success': '#00b894',
    'warning': '#fdcb6e',
    'danger': '#e17055',
    'info': '#6c5ce7'
  };

  return (
    <motion.div 
      className="card full-width"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        <h3>⏳ Authority Lifecycle</h3>
        <span className="card-badge">{steps.length} events</span>
      </div>
      
      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', padding: '8px 0' }}>
          {/* Horizontal timeline */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0',
            overflowX: 'auto',
            padding: '16px 8px',
            position: 'relative'
          }}>
            {displaySteps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Event node */}
                <motion.div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '80px',
                    position: 'relative',
                    flexShrink: 0
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: statusColors[step.status],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    border: '2px solid #2a2a44',
                    boxShadow: `0 0 20px ${statusColors[step.status]}20`
                  }}>
                    {statusIcons[step.status]}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#6a6a8a',
                    marginTop: '6px',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    color: '#4a4a6a',
                    textAlign: 'center',
                    fontFamily: 'monospace'
                  }}>
                    {step.timestamp || 'T0'}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: statusColors[step.status],
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {step.confidence}%
                  </div>
                </motion.div>

                {/* Connector line */}
                {index < displaySteps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    minWidth: '20px',
                    background: `linear-gradient(90deg, ${statusColors[step.status]}, ${statusColors[displaySteps[index + 1]?.status] || '#2a2a44'})`,
                    alignSelf: 'flex-start',
                    marginTop: '18px',
                    opacity: 0.6
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthorityLifecycle;