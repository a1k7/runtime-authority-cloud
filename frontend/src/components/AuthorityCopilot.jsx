import React from 'react';
import { motion } from 'framer-motion';

function AuthorityCopilot({ data }) {
  const { recommendation, reason, actions, estimatedTime } = data;

  return (
    <motion.div 
      className="card authority-copilot"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        <h3>🤖 Authority Copilot</h3>
      </div>
      
      <div className="card-body">
        <div className="copilot-grid">
          <div className="copilot-item">
            <span className="copilot-label">Recommendation</span>
            <span className={`copilot-value ${recommendation.includes('STOP') ? 'danger' : 'success'}`}>
              {recommendation}
            </span>
          </div>
          <div className="copilot-item">
            <span className="copilot-label">Reason</span>
            <span className="copilot-value warning">{reason}</span>
          </div>
          <div className="copilot-item">
            <span className="copilot-label">Next Action</span>
            <div className="copilot-actions">
              {actions.map((action, idx) => (
                <button key={idx} className="copilot-action primary">
                  ✓ {action}
                </button>
              ))}
            </div>
          </div>
          <div className="copilot-item">
            <span className="copilot-label">Estimated Time</span>
            <span className="copilot-value">{estimatedTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthorityCopilot;