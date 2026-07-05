import React from 'react';

function AlertBar({ data }) {
  const { executionBlocked, reason, lossPrevented, affectedAgents, criticalDrift, needsReauthorization } = data;

  return (
    <div className={`alert-bar ${!executionBlocked ? 'success' : ''}`}>
      <div className="alert-left">
        <div className="alert-icon">
          {executionBlocked ? '⛔' : '✅'}
        </div>
        <div className="alert-content">
          <h2>{executionBlocked ? 'Execution Blocked' : 'All Systems Clear'}</h2>
          <p className="alert-reason">
            {executionBlocked ? `Reason: ${reason}` : 'All executions passed verification'}
          </p>
        </div>
      </div>
      <div className="alert-stats">
        <div className="alert-stat">
          <div className={`stat-value ${executionBlocked ? 'danger' : 'success'}`}>
            {lossPrevented}
          </div>
          <div className="stat-label">Potential Loss Prevented</div>
        </div>
        <div className="alert-stat">
          <div className="stat-value">{affectedAgents}</div>
          <div className="stat-label">Affected Agents</div>
        </div>
        <div className="alert-stat">
          <div className="stat-value danger">{criticalDrift}</div>
          <div className="stat-label">Critical Drift</div>
        </div>
        <div className="alert-stat">
          <div className={`stat-value ${needsReauthorization === 'YES' ? 'danger' : 'success'}`}>
            {needsReauthorization}
          </div>
          <div className="stat-label">Needs Reauthorization</div>
        </div>
      </div>
    </div>
  );
}

export default AlertBar;