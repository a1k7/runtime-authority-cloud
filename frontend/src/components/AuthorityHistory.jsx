import React from 'react';
import { motion } from 'framer-motion';

function AuthorityHistory({ data }) {
  const { values, labels } = data;
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const range = maxVal - minVal || 1;

  const getLevel = (val) => {
    if (val >= 70) return 'high';
    if (val >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="card history full-width">
      <div className="card-header">
        <h3>📈 Authority History</h3>
        <span className="card-badge">Last 7 periods</span>
      </div>
      <div className="card-body">
        <div className="history-sparkline">
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              className={`history-bar ${getLevel(val)}`}
              style={{ height: `${20 + (val / maxVal) * 40}px` }}
              initial={{ height: 0 }}
              animate={{ height: `${20 + (val / maxVal) * 40}px` }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              title={`${labels[idx]}: ${val}%`}
            />
          ))}
        </div>
        <div className="history-labels">
          {labels.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6a6a8a' }}>
          <span>Min: {minVal}%</span>
          <span>Max: {maxVal}%</span>
          <span>Current: {values[values.length - 1]}%</span>
        </div>
      </div>
    </div>
  );
}

export default AuthorityHistory;