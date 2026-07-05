import React from 'react';

function APIsPage({ endpoints }) {
  const methodClasses = { 'GET': 'get', 'POST': 'post' };

  return (
    <div className="card full-width">
      <div className="card-header">
        <h3>⚡ API Reference</h3>
        <span className="card-badge">v2.0 · Namespaced</span>
      </div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
          {endpoints.map((endpoint, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 14px', background: '#1a1a2e', borderRadius: '10px',
              fontFamily: "'Courier New', monospace", fontSize: '13px'
            }}>
              <span className={`api-method ${methodClasses[endpoint.method]}`} style={{
                padding: '2px 8px', borderRadius: '4px', fontWeight: '700', fontSize: '11px',
                background: endpoint.method === 'GET' ? 'rgba(0,184,148,0.2)' : 'rgba(108,92,231,0.2)',
                color: endpoint.method === 'GET' ? '#00b894' : '#6c5ce7'
              }}>{endpoint.method}</span>
              <span style={{ color: '#a0a0b8' }}>{endpoint.path}</span>
              <span style={{ fontSize: '11px', color: '#6a6a8a', fontFamily: "'Inter', sans-serif" }}>{endpoint.desc}</span>
            </div>
          ))}
        </div>

        {/* Sample Request */}
        <div style={{ 
          background: '#0a0a0f', 
          borderRadius: '10px', 
          padding: '16px', 
          border: '1px solid #2a2a44',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '12px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Sample Request
          </div>
          <pre style={{ 
            background: '#12121f', 
            padding: '12px', 
            borderRadius: '6px', 
            color: '#a0a0b8', 
            fontFamily: 'monospace', 
            fontSize: '13px',
            overflow: 'auto',
            margin: 0
          }}>
{`POST /authority/verify
Content-Type: application/json

{
  "trace_id": "TRACE-ABC123",
  "policy_hash": "0x7a3f9c2e...",
  "identity": "agent:synth-coder-001",
  "evidence": {
    "jwt": "eyJhbGciOiJSUzI1NiIs...",
    "delegation_depth": 3,
    "policy_version": "v5.2"
  }
}`}
          </pre>
        </div>

        {/* Sample Response */}
        <div style={{ 
          background: '#0a0a0f', 
          borderRadius: '10px', 
          padding: '16px', 
          border: '1px solid #2a2a44'
        }}>
          <div style={{ fontSize: '12px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Sample Response
          </div>
          <pre style={{ 
            background: '#12121f', 
            padding: '12px', 
            borderRadius: '6px', 
            color: '#a0a0b8', 
            fontFamily: 'monospace', 
            fontSize: '13px',
            overflow: 'auto',
            margin: 0
          }}>
{`{
  "authority": "INVALID",
  "reason": "Policy Drift",
  "recommendation": "Stop Execution",
  "certificate": {
    "status": "INVALID",
    "issued": "14:23 UTC",
    "expires": "14:31 UTC",
    "hash": "0x82374a9f..."
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default APIsPage;