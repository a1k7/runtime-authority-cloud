import React, { useState } from 'react';
import { motion } from 'framer-motion';

function EvidenceExplorer({ evidence }) {
  const [expanded, setExpanded] = useState(null);

  const statusColors = {
    'healthy': '#00b894',
    'expired': '#e17055',
    'changed': '#fdcb6e',
    'rotated': '#6c5ce7',
    'restricted': '#e17055'
  };

  const statusClasses = {
    'healthy': 'healthy',
    'expired': 'expired',
    'changed': 'changed',
    'rotated': 'rotated',
    'restricted': 'restricted'
  };

  const renderDetailFields = (item) => {
    // For JWT/OIDC tokens: show issuer, expiry, TTL, hash
    if (item.name === 'JWT' || item.name === 'OIDC Token') {
      return (
        <>
          <div className="detail-item"><span className="detail-label">Issuer</span><span className="detail-value">{item.issuer || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Expiry</span><span className="detail-value">{item.expiry || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">TTL</span><span className="detail-value">{item.ttl || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Hash</span><span className="detail-value">{item.hash || 'N/A'}</span></div>
        </>
      );
    }

    // For Policy – rich artifact metadata
    if (item.name === 'Policy') {
      return (
        <>
          <div className="detail-item"><span className="detail-label">Version</span><span className="detail-value">{item.version || '5.3'}</span></div>
          <div className="detail-item"><span className="detail-label">Commit</span><span className="detail-value">{item.commit || '7a3f9c2'}</span></div>
          <div className="detail-item"><span className="detail-label">SHA256</span><span className="detail-value mono">{item.hash || '0x9f2147a3...'}</span></div>
          <div className="detail-item"><span className="detail-label">Publisher</span><span className="detail-value">{item.publisher || 'Platform Security'}</span></div>
          <div className="detail-item"><span className="detail-label">Repository</span><span className="detail-value">{item.repository || 'github.com/org/policy-repo'}</span></div>
          <div className="detail-item"><span className="detail-label">Last Updated</span><span className="detail-value">{item.updatedAt || '14:22:18 UTC'}</span></div>
          <div className="detail-item" style={{ gridColumn: 'span 2' }}>
            <span className="detail-label">Affected Permissions</span>
            <span className="detail-value">{item.affectedPermissions || 'database.write, code.patch.apply, config.update'}</span>
          </div>
        </>
      );
    }

    // For Delegation
    if (item.name === 'Delegation') {
      return (
        <>
          <div className="detail-item"><span className="detail-label">Depth</span><span className="detail-value">{item.depth || '3 → 2'}</span></div>
          <div className="detail-item"><span className="detail-label">Chain</span><span className="detail-value">{item.chain || 'root → admin → finance'}</span></div>
          <div className="detail-item"><span className="detail-label">Hash</span><span className="detail-value mono">{item.hash || '0x4d7e1f2a...'}</span></div>
          <div className="detail-item"><span className="detail-label">Updated</span><span className="detail-value">{item.updatedAt || '14:22:18 UTC'}</span></div>
          <div className="detail-item" style={{ gridColumn: 'span 2' }}>
            <span className="detail-label">Delegation Scope</span>
            <span className="detail-value">{item.scope || 'finance → operations → execution'}</span>
          </div>
        </>
      );
    }

    // For Identity
    if (item.name === 'Identity') {
      return (
        <>
          <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">{item.type || 'Service Account'}</span></div>
          <div className="detail-item"><span className="detail-label">ID</span><span className="detail-value mono">{item.id || 'agent:synth-coder-001'}</span></div>
          <div className="detail-item"><span className="detail-label">Rotated</span><span className="detail-value">{item.rotatedAt || '14:15:00 UTC'}</span></div>
          <div className="detail-item"><span className="detail-label">Hash</span><span className="detail-value mono">{item.hash || '0x2a8c4d7e...'}</span></div>
        </>
      );
    }

    // For Capabilities
    if (item.name === 'Capabilities') {
      return (
        <>
          <div className="detail-item"><span className="detail-label">Added</span><span className="detail-value">{item.added || 'database.read'}</span></div>
          <div className="detail-item"><span className="detail-label">Removed</span><span className="detail-value">{item.removed || 'database.delete'}</span></div>
          <div className="detail-item"><span className="detail-label">Hash</span><span className="detail-value mono">{item.hash || '0x6b1d3f2a...'}</span></div>
          <div className="detail-item"><span className="detail-label">Updated</span><span className="detail-value">{item.updatedAt || '14:22:18 UTC'}</span></div>
          <div className="detail-item" style={{ gridColumn: 'span 2' }}>
            <span className="detail-label">Active Permissions</span>
            <span className="detail-value">{item.activePermissions || 'database.read, config.view, logs.query'}</span>
          </div>
        </>
      );
    }

    // Default fallback
    return (
      <>
        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value">{item.status}</span></div>
        <div className="detail-item"><span className="detail-label">Updated</span><span className="detail-value">{item.updatedAt || 'N/A'}</span></div>
      </>
    );
  };

  return (
    <div className="card full-width">
      <div className="card-header">
        <h3>🔍 Evidence Explorer</h3>
        <span className="card-badge">{evidence.length} items</span>
      </div>
      <div className="card-body">
        <div className="evidence-list">
          {evidence.map((item, index) => (
            <div key={index}>
              <motion.div 
                className="evidence-item"
                style={{ borderLeftColor: statusColors[item.status] || '#2a2a44' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                <span className="evidence-name">{item.name}</span>
                <div className="evidence-detail">
                  <span>{item.detail}</span>
                  <span className={`evidence-status ${statusClasses[item.status]}`}>
                    {item.status.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '11px', color: '#4a4a6a' }}>↕</span>
                </div>
              </motion.div>
              {expanded === index && (
                <motion.div 
                  className="evidence-detail-popup"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {renderDetailFields(item)}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EvidenceExplorer;