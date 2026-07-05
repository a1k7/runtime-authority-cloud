import React, { useState } from 'react';
import { motion } from 'framer-motion';

function AuthorityCertificate({ data }) {
  const [showVerification, setShowVerification] = useState(false);

  const {
    status = 'VALID',
    authority = '96%',
    issued = '14:23 UTC',
    expires = '14:31 UTC',
    replayAvailable = 'Available',
    verifier = 'DecisionAssure Runtime',
    traceHash = '0x82374a9f...',
    signedBy = 'Runtime Authority Cloud',
    signature = '0x7f3a9c2e4b1d8f6a...',
    publicKeyId = 'RAC-2026-07-05-001',
    verificationTime = '14:23:12 UTC',
    replayId = 'RPL-847238',
    trustChain = 'Root CA → Intermediate → RAC',
  } = data || {};

  const isValid = status === 'VALID';

  const handleVerify = () => {
    setShowVerification(!showVerification);
  };

  return (
    <motion.div 
      className={`certificate ${isValid ? 'valid' : 'invalid'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
    >
      <div className="cert-header">
        <span className="cert-title">🔐 Runtime Authority Certificate (RAC)</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className={`cert-badge ${isValid ? 'valid' : 'invalid'}`}>
            {isValid ? '✅ VALID' : '❌ INVALID'}
          </span>
          <button 
            onClick={handleVerify}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid #6c5ce7',
              background: 'transparent',
              color: '#a0a0b8',
              cursor: 'pointer',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#1a1a2e'; e.target.style.color = '#e8e8f0'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#a0a0b8'; }}
          >
            {showVerification ? 'Hide' : 'Verify Signature'}
          </button>
        </div>
      </div>

      {/* Certificate Section */}
      <div className="cert-section" style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
          Certificate
        </div>
        <div className="cert-body">
          <div className="cert-field">
            <span className="cert-label">Status</span>
            <span className={`cert-value ${isValid ? 'valid' : 'invalid'}`}>
              {isValid ? 'VALID' : 'INVALID'}
            </span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Authority</span>
            <span className="cert-value">{authority}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Issued</span>
            <span className="cert-value">{issued}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Expires</span>
            <span className="cert-value">{expires}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Replay</span>
            <span className="cert-value">{replayAvailable}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Replay ID</span>
            <span className="cert-value mono">{replayId}</span>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="cert-section" style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
          Verification
        </div>
        <div className="cert-body">
          <div className="cert-field">
            <span className="cert-label">Verifier</span>
            <span className="cert-value">{verifier}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Verification Time</span>
            <span className="cert-value">{verificationTime}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Signed By</span>
            <span className="cert-value">{signedBy}</span>
          </div>
          <div className="cert-field">
            <span className="cert-label">Public Key ID</span>
            <span className="cert-value mono">{publicKeyId}</span>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="cert-section" style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
          Signature
        </div>
        <div className="cert-body">
          <div className="cert-field" style={{ gridColumn: 'span 2' }}>
            <span className="cert-label">Signature</span>
            <span className="cert-value mono">{signature}</span>
          </div>
          <div className="cert-field" style={{ gridColumn: 'span 2' }}>
            <span className="cert-label">Trace Hash</span>
            <span className="cert-value mono">{traceHash}</span>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="cert-section">
        <div style={{ fontSize: '10px', color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
          Trust
        </div>
        <div className="cert-body">
          <div className="cert-field" style={{ gridColumn: 'span 2' }}>
            <span className="cert-label">Trust Chain</span>
            <span className="cert-value">{trustChain}</span>
          </div>
          <div className="cert-field" style={{ gridColumn: 'span 2' }}>
            <span className="cert-label">SHA256</span>
            <span className="cert-value mono">{traceHash}</span>
          </div>
        </div>
      </div>

      {showVerification && (
        <motion.div 
          className="verification-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: '16px',
            padding: '16px',
            background: '#0a0a0f',
            borderRadius: '10px',
            border: '1px solid #2a2a44',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', fontSize: '13px' }}>
            <span style={{ color: '#6a6a8a' }}>SHA256</span>
            <span style={{ color: '#a0a0b8', fontFamily: 'monospace' }}>{traceHash}</span>
            <span style={{ color: '#6a6a8a' }}>Signature</span>
            <span style={{ color: '#a0a0b8', fontFamily: 'monospace' }}>{signature}</span>
            <span style={{ color: '#6a6a8a' }}>Signer</span>
            <span style={{ color: '#a0a0b8' }}>{signedBy}</span>
            <span style={{ color: '#6a6a8a' }}>Verification Result</span>
            <span style={{ color: '#00b894', fontWeight: '600' }}>✅ Verified</span>
            <span style={{ color: '#6a6a8a' }}>Trust Chain</span>
            <span style={{ color: '#a0a0b8' }}>{trustChain}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default AuthorityCertificate;