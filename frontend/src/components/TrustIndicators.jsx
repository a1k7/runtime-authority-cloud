import React from 'react';
import { motion } from 'framer-motion';

function TrustIndicators({ data }) {
  return (
    <motion.div 
      className="card trust-indicators"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="card-header">
        <h3>🛡️ Trust Indicators</h3>
      </div>
      
      <div className="card-body">
        <div className="trust-grid">
          {data.map((item, index) => (
            <div key={index} className="trust-item">
              <span className="trust-icon">{item.status.includes('✅') ? '✅' : '📋'}</span>
              <span className="trust-name">{item.name}</span>
              <span className="trust-status ready">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default TrustIndicators;