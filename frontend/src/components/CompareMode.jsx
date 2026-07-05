import React from 'react';
import { motion } from 'framer-motion';

function CompareMode({ data }) {
  const {
    yesterday = 98,
    today = 41,
    chain = ['Policy Drift', 'Delegation Changed', 'Evidence Expired'],
    yesterdayVersion = '5.2',
    todayVersion = '5.3',
    yesterdayEvidence = 'Valid',
    todayEvidence = 'Expired',
  } = data || {};

  const diff = today - yesterday;
  const diffText = diff >= 0 ? `+${diff}%` : `${diff}%`;
  const diffClass = diff >= 0 ? 'up' : 'down';

  return (
    <div className="card compare full-width">
      <div className="card-header">
        <h3>📊 Compare Mode</h3>
        <span className="card-badge">24h Change</span>
      </div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Yesterday */}
          <div style={{ padding: '16px', background: '#1a1a2e', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
              Yesterday
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: yesterday >= 70 ? '#00b894' : '#e17055', textAlign: 'center' }}>
              {yesterday}%
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', marginTop: '8px', fontSize: '12px' }}>
              <span style={{ color: '#6a6a8a' }}>Policy Version</span>
              <span style={{ color: '#a0a0b8' }}>{yesterdayVersion}</span>
              <span style={{ color: '#6a6a8a' }}>Evidence</span>
              <span style={{ color: '#00b894' }}>{yesterdayEvidence}</span>
            </div>
          </div>

          {/* Today */}
          <div style={{ padding: '16px', background: '#1a1a2e', borderRadius: '10px', border: '1px solid #2a2a44' }}>
            <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
              Today
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: today >= 70 ? '#00b894' : '#e17055', textAlign: 'center' }}>
              {today}%
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', marginTop: '8px', fontSize: '12px' }}>
              <span style={{ color: '#6a6a8a' }}>Policy Version</span>
              <span style={{ color: '#e17055' }}>{todayVersion}</span>
              <span style={{ color: '#6a6a8a' }}>Evidence</span>
              <span style={{ color: '#e17055' }}>{todayEvidence}</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: diff >= 0 ? '#00b894' : '#e17055', textAlign: 'center', marginTop: '8px' }}>
              {diffText} {diff >= 0 ? '↑' : '↓'}
            </div>
          </div>
        </div>

        {chain && chain.length > 0 && (
          <div style={{ marginTop: '12px', padding: '12px 16px', background: '#1a1a2e', borderRadius: '10px', borderLeft: '3px solid #fdcb6e' }}>
            <div style={{ fontSize: '12px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Drop Explanation</div>
            {chain.map((item, idx) => (
              <div key={idx} style={{ fontSize: '13px', color: '#a0a0b8', marginTop: '2px' }}>
                {idx > 0 && '↓ '}{item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareMode;