import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function AnimatedTimeline({ steps, full }) {
  const [visibleSteps, setVisibleSteps] = useState(full ? steps : steps.slice(0, 5));

  const statusIcons = {
    'success': '✅',
    'warning': '⚠️',
    'danger': '❌',
    'info': 'ℹ️'
  };

  const confidenceColors = {
    'high': 'high',
    'medium': 'medium',
    'low': 'low'
  };

  const getConfidenceLevel = (value) => {
    if (value >= 70) return 'high';
    if (value >= 40) return 'medium';
    return 'low';
  };

  return (
    <motion.div 
      className="card animated-timeline full-width"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="card-header">
        <h3>⏳ Authority Timeline</h3>
        <span className="card-badge">{steps.length} steps</span>
      </div>
      
      <div className="card-body">
        <div className="timeline-animated">
          {visibleSteps.map((step, index) => (
            <motion.div 
              key={index}
              className="timeline-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`step-marker ${step.status}`}>
                {statusIcons[step.status]}
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
              <div className={`step-confidence ${getConfidenceLevel(step.confidence)}`}>
                {step.confidence}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AnimatedTimeline;