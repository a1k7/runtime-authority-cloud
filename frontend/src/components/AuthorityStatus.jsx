import React from 'react';

function AuthorityStatus({ data }) {
  const {
    status = 'INVALID',
    statusClass = 'danger',
    statusDisplay = 'Execution denied',
    reason = 'Policy drift detected',
    authorityId = 'AUTH-847238',
    verified = '12 sec ago',
    confidence = 96,
    policyVersion = 'v5.2 → v5.3',
    delegationDepth = '3 → 2',
    evidenceTTL = 'Expired',
    decisionTime = '14:23:12 UTC',
  } = data || {};

  return (
    <div className={`authority-status-hero ${statusClass}`}>
      <div className="status-left">
        <div className="status-label">AUTHORITY STATUS</div>
        <div className={`status-value ${statusClass}`}>❌ {status}</div>
        <div className="status-sub">{statusDisplay}</div>
        <div className="status-reason">Reason: {reason}</div>
      </div>

      <div className="status-center" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px 24px',
        padding: '0 20px',
        flex: 1,
        maxWidth: '400px'
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Policy Version</div>
          <div style={{ fontSize: '14px', color: '#e8e8f0', fontWeight: '500' }}>{policyVersion}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delegation Depth</div>
          <div style={{ fontSize: '14px', color: '#e8e8f0', fontWeight: '500' }}>{delegationDepth}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Evidence TTL</div>
          <div style={{ fontSize: '14px', color: evidenceTTL === 'Expired' ? '#e17055' : '#00b894', fontWeight: '500' }}>{evidenceTTL}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Decision Time</div>
          <div style={{ fontSize: '14px', color: '#e8e8f0', fontWeight: '500' }}>{decisionTime}</div>
        </div>
      </div>

      <div className="status-right">
        <div className="status-meta"><strong>Authority ID</strong> {authorityId}</div>
        <div className="status-meta"><strong>Verified</strong> {verified}</div>
        <div className="status-meta" style={{ fontSize: '14px', color: '#e8e8f0', fontWeight: '600' }}>
          Confidence: {confidence}%
        </div>
      </div>
    </div>
  );
}

export default AuthorityStatus;