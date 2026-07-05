import React from 'react';
import { motion } from 'framer-motion';

function FixRecommendations({ recommendations }) {
  const severityColors = {
    'LOW': '#00b894',
    'MEDIUM': '#fdcb6e',
    'HIGH': '#e17055'
  };

  return (
    <motion.div 
      className="card fix-recommendations"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="card-header">
        <h3>Fix Recommendations</h3>
        <span className="card-badge">{recommendations.length} actions</span>
      </div>
      
      <div className="card-body">
        {recommendations.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✅</span>
            <p>No recommendations needed</p>
          </div>
        ) : (
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <motion.div 
                key={index} 
                className="recommendation-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="recommendation-severity" style={{ backgroundColor: severityColors[rec.severity] || '#6a6a8a' }}>
                  {rec.severity}
                </div>
                <div className="recommendation-content">
                  <h4>{rec.title}</h4>
                  <p>{rec.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default FixRecommendations;