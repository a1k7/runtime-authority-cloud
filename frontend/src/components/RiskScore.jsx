import React from 'react';
import { motion } from 'framer-motion';

function RiskScore({ score }) {
  const level = score.level || 'UNKNOWN';
  const scoreValue = score.score || 0;

  const levelColors = {
    'LOW': '#00b894',
    'MEDIUM': '#fdcb6e',
    'HIGH': '#e17055',
    'UNKNOWN': '#6a6a8a'
  };

  const levelDescriptions = {
    'LOW': 'Low risk – authority trail is intact',
    'MEDIUM': 'Medium risk – some drift detected, review recommended',
    'HIGH': 'High risk – immediate attention required',
    'UNKNOWN': 'Insufficient data'
  };

  return (
    <motion.div 
      className="card risk-score"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">
        <h3>Risk Score</h3>
        <span className="card-badge" style={{ backgroundColor: levelColors[level] }}>
          {level}
        </span>
      </div>
      
      <div className="card-body">
        <div className="risk-score-circle">
          <svg viewBox="0 0 120 120">
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              fill="none" 
              stroke="#1a1a2e" 
              strokeWidth="12"
            />
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              fill="none" 
              stroke={levelColors[level]} 
              strokeWidth="12"
              strokeDasharray={`${(scoreValue / 100) * 314} 314`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="60" textAnchor="middle" dominantBaseline="central" className="score-value">
              {scoreValue}
            </text>
          </svg>
        </div>
        
        <div className="risk-description">
          <p className="risk-level">{levelDescriptions[level]}</p>
          {score.factors && score.factors.length > 0 && (
            <div className="risk-factors">
              <span className="factors-label">Risk factors:</span>
              {score.factors.map((factor, index) => (
                <span key={index} className="factor-tag">
                  {factor}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RiskScore;