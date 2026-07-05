import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function AuthorityTimeline({ timeline, full }) {
  const data = timeline.map(item => ({
    step: item.step,
    timestamp: item.timestamp,
    state: item.state,
    delegation: item.delegation_depth
  }));

  const stateColors = {
    'ADMISSIBLE': '#00b894',
    'DEGRADED': '#fdcb6e',
    'UNKNOWN': '#6c5ce7',
    'DENIED': '#e17055',
    'RECOVERY': '#00cec9'
  };

  return (
    <motion.div 
      className="card authority-timeline"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        <h3>Authority Timeline</h3>
        <span className="card-badge">{timeline.length} steps</span>
      </div>
      
      <div className="card-body">
        <div className="timeline-visual">
          <ResponsiveContainer width="100%" height={full ? 400 : 200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a44" />
              <XAxis dataKey="step" stroke="#6a6a8a" />
              <YAxis stroke="#6a6a8a" />
              <Tooltip 
                contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a44' }}
                labelStyle={{ color: '#a0a0b8' }}
              />
              <Line 
                type="monotone" 
                dataKey="delegation" 
                stroke="#6c5ce7" 
                strokeWidth={2}
                dot={{ fill: '#6c5ce7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {!full && timeline.length > 0 && (
          <div className="timeline-steps">
            {timeline.slice(-5).map((item, index) => (
              <div key={index} className="timeline-step">
                <div className="step-indicator" style={{ backgroundColor: stateColors[item.state] || '#6a6a8a' }}></div>
                <div className="step-content">
                  <span className="step-number">Step {item.step}</span>
                  <span className="step-state">{item.state}</span>
                  <span className="step-delegation">Depth: {item.delegation_depth}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AuthorityTimeline;