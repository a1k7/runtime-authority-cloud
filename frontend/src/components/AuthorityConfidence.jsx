import React from 'react';
import { motion } from 'framer-motion';

function AuthorityConfidence({ data }) {
  const { score, level } = data;

  const levelColors = {
    'LOW': '#00b894',
    'MEDIUM': '#fdcb6e',
    'HIGH': '#e17055',
    'UNKNOWN': '#6a6a8a'
  };

  const statusLabels = {
    'LOW': 'SAFE',
    'MEDIUM': 'REVIEW',
    'HIGH': 'STOP',
    'UNKNOWN': 'UNKNOWN'
  };

  const statusClasses = {
    'LOW': 'safe',
    'MEDIUM': 'warning',
    'HIGH': 'danger',
    'UNKNOWN': 'warning'
  };

  return (
    <motion.div 
      className="card authority-confidence"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">
        <h3>Authority Confidence</h3>
      </div>
      
      <div className="card-body">
        <div className="confidence-circle">
          <svg viewBox="0 0 140 140">
            <circle 
              cx="70" 
              cy="70" 
              r="58" 
              fill="none" 
              stroke="#1a1a2e" 
              strokeWidth="10"
            />
            <circle 
              cx="70" 
              cy="70" 
              r="58" 
              fill="none" 
              stroke={levelColors[level] || '#6a6a8a'} 
              strokeWidth="10"
              strokeDasharray={`${(score / 100) * 364} 364`}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
            <text x="70" y="60" textAnchor="middle" dominantBaseline="central" className="confidence-value">
              {score}%
            </text>
            <text x="70" y="85" textAnchor="middle" dominantBaseline="central" className="confidence-label">
              Authority Confidence
            </text>
          </svg>
        </div>
        
        <div className="confidence-status">
          <span className={`status-badge ${statusClasses[level]}`}>
            {statusLabels[level]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthorityConfidence;