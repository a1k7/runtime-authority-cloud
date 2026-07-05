import React from 'react';
import { motion } from 'framer-motion';

function ExpiredEvidence({ evidence }) {
  return (
    <motion.div 
      className="card expired-evidence"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="card-header">
        <h3>Expired Evidence</h3>
        <span className="card-badge">{evidence.length} expired</span>
      </div>
      
      <div className="card-body">
        {evidence.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✅</span>
            <p>All evidence is fresh</p>
          </div>
        ) : (
          <div className="evidence-list">
            {evidence.slice(0, 5).map((item, index) => (
              <motion.div 
                key={index} 
                className="evidence-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="evidence-icon">⏰</div>
                <div className="evidence-content">
                  <div className="evidence-header">
                    <span className="evidence-step">Step {item.step}</span>
                    <span className="evidence-age">{Math.floor(item.age_seconds / 60)}m {Math.floor(item.age_seconds % 60)}s old</span>
                  </div>
                  <div className="evidence-timestamp">{item.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ExpiredEvidence;