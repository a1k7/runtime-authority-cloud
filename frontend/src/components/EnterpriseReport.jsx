import React from 'react';

function EnterpriseReport({ data }) {
  const {
    authority = 'UNKNOWN',
    reason = 'No reason provided',
    severity = 'Unknown',
    recommendation = 'None',
    potentialExposure = '$0',
    affectedSystems = '0',
    affectedAgents = '0',
    recommendedOwner = 'N/A',
    eta = 'N/A',
    boardSummary = 'Execution was blocked because policy v5.2 changed to v5.3 after approval, invalidating delegated authority.',
    technicalAppendix = 'Delegation chain shortened from depth 3 to 2. Policy version mismatch: v5.2 vs v5.3. Evidence TTL expired (612s > 600s).'
  } = data || {};

  const handleExport = (format) => {
    const reportData = {
      authority,
      reason,
      severity,
      recommendation,
      potentialExposure,
      affectedSystems,
      affectedAgents,
      recommendedOwner,
      eta,
      boardSummary,
      technicalAppendix,
      exportedAt: new Date().toISOString(),
      reportId: `RPT-${Date.now().toString(36).toUpperCase()}`,
    };

    let content = '';
    let filename = '';
    let type = '';

    switch (format) {
      case 'pdf':
        window.print();
        return;

      case 'json':
        content = JSON.stringify(reportData, null, 2);
        filename = `authority-report-${Date.now()}.json`;
        type = 'application/json';
        break;

      case 'trace':
        const traceData = {
          traceId: `TRACE-${Date.now().toString(36).toUpperCase()}`,
          timestamp: new Date().toISOString(),
          authority,
          reason,
          severity,
          recommendation,
          steps: [
            { step: 1, action: 'Authority Granted', status: 'success' },
            { step: 2, action: 'Policy Check', status: severity === 'Critical' ? 'failed' : 'passed' },
            { step: 3, action: 'Delegation Check', status: severity === 'Critical' ? 'failed' : 'passed' },
            { step: 4, action: 'Evidence Check', status: severity === 'Critical' ? 'failed' : 'passed' },
            { step: 5, action: 'Execution', status: recommendation === 'Stop Execution' ? 'denied' : 'allowed' },
          ],
          affectedSystems,
          affectedAgents,
        };
        content = JSON.stringify(traceData, null, 2);
        filename = `trace-${Date.now()}.json`;
        type = 'application/json';
        break;

      case 'replay':
        const replayData = {
          replayId: `REPLAY-${Date.now().toString(36).toUpperCase()}`,
          timestamp: new Date().toISOString(),
          authority,
          reason,
          severity,
          recommendation,
          timeline: [
            { time: 'T0', event: 'Approval Granted', confidence: 100 },
            { time: 'T1', event: 'Policy Updated', confidence: 82 },
            { time: 'T2', event: 'Delegation Changed', confidence: 61 },
            { time: 'T3', event: 'Evidence Expired', confidence: 18 },
            { time: 'T4', event: 'Execution Blocked', confidence: 0 },
          ],
        };
        content = JSON.stringify(replayData, null, 2);
        filename = `replay-${Date.now()}.json`;
        type = 'application/json';
        break;

      default:
        return;
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card full-width">
      <div className="card-header">
        <h3>📊 Executive Summary</h3>
        <span className="card-badge">Board Ready</span>
      </div>
      <div className="card-body">
        {/* Board Summary */}
        <div style={{ 
          background: '#1a1a2e', 
          padding: '16px', 
          borderRadius: '10px', 
          marginBottom: '16px',
          borderLeft: `4px solid ${authority === 'VALID' ? '#00b894' : '#e17055'}`
        }}>
          <div style={{ fontSize: '12px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
            Board Summary
          </div>
          <div style={{ fontSize: '15px', color: '#e8e8f0', lineHeight: '1.5' }}>
            {boardSummary}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {[
            ['Authority', authority, authority === 'VALID' ? '#00b894' : '#e17055'],
            ['Reason', reason, '#fdcb6e'],
            ['Severity', severity, severity === 'Critical' ? '#e17055' : '#fdcb6e'],
            ['Recommendation', recommendation, recommendation === 'Continue' ? '#00b894' : '#e17055'],
            ['Potential Exposure', potentialExposure, '#e17055'],
            ['Affected Systems', affectedSystems, '#e8e8f0'],
            ['Affected Agents', affectedAgents, '#e8e8f0'],
            ['Recommended Owner', recommendedOwner, '#6c5ce7'],
            ['ETA', eta, '#00b894'],
          ].map(([label, value, color], idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2px', 
              padding: '8px 12px', 
              background: '#1a1a2e', 
              borderRadius: '10px' 
            }}>
              <span style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {label}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '700', color }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Technical Appendix */}
        <div style={{ 
          background: '#0a0a0f', 
          padding: '12px 16px', 
          borderRadius: '10px', 
          marginBottom: '16px',
          border: '1px solid #2a2a44',
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#a0a0b8',
          whiteSpace: 'pre-wrap'
        }}>
          <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
            Technical Appendix
          </div>
          {technicalAppendix}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="export-btn" 
            onClick={() => handleExport('pdf')}
            style={{ 
              background: '#e17055', 
              border: 'none', 
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📄 Download PDF
          </button>
          <button 
            className="export-btn" 
            onClick={() => handleExport('json')}
            style={{ 
              background: '#6c5ce7', 
              border: 'none', 
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📋 Download JSON
          </button>
          <button 
            className="export-btn" 
            onClick={() => handleExport('trace')}
            style={{ 
              background: '#00b894', 
              border: 'none', 
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📊 Export Trace
          </button>
          <button 
            className="export-btn" 
            onClick={() => handleExport('replay')}
            style={{ 
              background: '#fdcb6e', 
              border: 'none', 
              color: '#1a1a2e',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔁 Export Replay
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseReport;