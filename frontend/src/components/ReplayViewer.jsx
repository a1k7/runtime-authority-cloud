import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ReplayViewer({ steps: propSteps, traceId }) {
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const defaultSteps = [
    { step: 1, title: 'Approved', status: 'success', confidence: 100, timestamp: '14:22:00 UTC' },
    { step: 2, title: 'Capability Added', status: 'info', confidence: 97, timestamp: '14:22:05 UTC' },
    { step: 3, title: 'Policy Updated', status: 'warning', confidence: 82, timestamp: '14:22:10 UTC' },
    { step: 4, title: 'Delegation Changed', status: 'warning', confidence: 61, timestamp: '14:22:12 UTC' },
    { step: 5, title: 'Evidence Expired', status: 'danger', confidence: 18, timestamp: '14:22:15 UTC' },
    { step: 6, title: 'Execution Denied', status: 'danger', confidence: 0, timestamp: '14:22:18 UTC' },
  ];

  const steps = propSteps || defaultSteps;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;

  useEffect(() => {
    let interval;
    if (playing && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else if (currentStep >= steps.length - 1) {
      setPlaying(false);
    }
    return () => clearInterval(interval);
  }, [playing, currentStep, steps.length]);

  const statusIcons = {
    'success': '✓',
    'warning': '⚠',
    'danger': '✗',
    'info': 'ℹ️'
  };

  const statusColors = {
    'success': '#00b894',
    'warning': '#fdcb6e',
    'danger': '#e17055',
    'info': '#6c5ce7'
  };

  const getConfidenceClass = (value) => {
    if (value >= 70) return 'high';
    if (value >= 40) return 'medium';
    return 'low';
  };

  return (
    <motion.div 
      className="card full-width"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        <h3>🎬 Decision Replay</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="replay-btn"
            onClick={() => { setCurrentStep(0); setPlaying(false); }}
          >
            ⏮
          </button>
          <button 
            className={`replay-btn ${playing ? 'primary' : ''}`}
            onClick={() => setPlaying(!playing)}
            style={{ background: playing ? '#e17055' : '#6c5ce7', color: 'white' }}
          >
            {playing ? '⏸' : '▶'}
          </button>
          <button 
            className="replay-btn"
            onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
          >
            ⏭
          </button>
          <div className="replay-progress" style={{ flex: 1, height: '4px', background: '#1a1a2e', borderRadius: '2px', overflow: 'hidden' }}>
            <div className="progress-fill" style={{ height: '100%', background: 'linear-gradient(90deg, #6c5ce7, #00cec9)', borderRadius: '2px', transition: 'width 0.3s ease', width: `${progress}%` }} />
          </div>
          <span style={{ fontSize: '12px', color: '#6a6a8a', minWidth: '40px' }}>
            {progress}%
          </span>
        </div>
      </div>
      
      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 0' }}>
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep;
            const isPast = index < currentStep;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: isCurrent ? 'rgba(108,92,231,0.1)' : 'transparent',
                  border: isCurrent ? '1px solid rgba(108,92,231,0.3)' : '1px solid transparent',
                  opacity: isActive ? 1 : 0.3,
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Node icon with glow */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isActive ? statusColors[step.status] : '#1a1a2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: isActive ? '#0a0a0f' : '#4a4a6a',
                  boxShadow: isActive ? `0 0 30px ${statusColors[step.status]}40` : 'none',
                  transition: 'all 0.5s ease',
                  border: isCurrent ? `2px solid ${statusColors[step.status]}` : '2px solid #2a2a44',
                  flexShrink: 0
                }}>
                  {isActive ? statusIcons[step.status] : '•'}
                </div>

                {/* Connector line */}
                {index > 0 && (
                  <div style={{
                    position: 'absolute',
                    left: '34px',
                    top: '-14px',
                    height: '14px',
                    width: '2px',
                    background: isPast ? statusColors[steps[index-1]?.status] : '#2a2a44',
                    transition: 'background 0.5s ease'
                  }} />
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: isCurrent ? '700' : '500', color: isActive ? '#e8e8f0' : '#4a4a6a' }}>
                      Step {step.step}: {step.title}
                    </span>
                    {isCurrent && (
                      <span style={{ fontSize: '10px', color: '#6c5ce7', fontWeight: '600', animation: 'pulse 1s infinite' }}>
                        ⬤ REPLAYING
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: isActive ? '#6a6a8a' : '#2a2a44' }}>
                    {step.timestamp && <span>{step.timestamp}</span>}
                  </div>
                </div>

                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isActive ? statusColors[step.status] : '#2a2a44',
                  transition: 'color 0.5s ease'
                }}>
                  {step.confidence}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default ReplayViewer;