import React from 'react';
import { motion } from 'framer-motion';

function ExecutiveSummary({ data }) {
  const { authorityValid, executionRecommended, rootCause, potentialImpact, recommendedAction, estimatedTime } = data;

  return (
    <motion.div 
      className="card executive-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="card-header">
        <h3>Executive Summary</h3>
        <span className="card-badge">Decision Ready</span>
      </div>
      
      <div className="card-body">
        <div className="executive-grid">
          <div className="executive-item">
            <span className="exec-label">Authority Valid</span>
            <span className={`exec-value ${authorityValid ? 'success' : 'danger'}`}>
              {authorityValid ? 'YES' : 'NO'}
            </span>
          </div>
          <div className="executive-item">
            <span className="exec-label">Execution Recommended</span>
            <span className={`exec-value ${executionRecommended === 'CONTINUE' ? 'success' : 'danger'}`}>
              {executionRecommended}
            </span>
          </div>
          <div className="executive-item">
            <span className="exec-label">Root Cause</span>
            <span className="exec-value warning">{rootCause}</span>
          </div>
          <div className="executive-item">
            <span className="exec-label">Potential Impact</span>
            <span className="exec-value danger">{potentialImpact}</span>
          </div>
          <div className="executive-item">
            <span className="exec-label">Recommended Action</span>
            <span className="exec-value info">{recommendedAction}</span>
          </div>
          <div className="executive-item">
            <span className="exec-label">Estimated Time</span>
            <span className="exec-value">{estimatedTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutiveSummary;