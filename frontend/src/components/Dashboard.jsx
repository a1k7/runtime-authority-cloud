import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import axios from 'axios';

import AuthorityStatus from './AuthorityStatus';
import AuthorityCopilot from './AuthorityCopilot';
import AuthorityGraph from './AuthorityGraph';
import AuthorityLifecycle from './AuthorityLifecycle';
import AuthorityCertificate from './AuthorityCertificate';
import AuthorityHistory from './AuthorityHistory';
import EvidenceExplorer from './EvidenceExplorer';
import EnterpriseReport from './EnterpriseReport';
import TrustIndicators from './TrustIndicators';
import CompareMode from './CompareMode';
import GlobalSearch from './GlobalSearch';
import APIsPage from './APIsPage';
import LiveSystems from './LiveSystems';
import DriftSummary from './DriftSummary';
import AuthorityDNA from './AuthorityDNA';
import CostEstimation from './CostEstimation';
import AskAI from './AskAI';
import ReplayViewer from './ReplayViewer';

function Dashboard() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadId, setUploadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/json': ['.json'] },
    maxFiles: 1,
    onDrop: handleFileDrop
  });

  async function handleFileDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadRes = await axios.post('/api/upload', formData);
      const uploadId = uploadRes.data.upload_id;
      setUploadId(uploadId);
      setUploadedFile(file.name);
      toast.success('Trace uploaded successfully');
      const analyzeRes = await axios.post(`/api/analyze/${uploadId}`);
      toast.success('Analysis complete');
      const reportRes = await axios.get(`/api/report/${uploadId}`);
      setReportData(reportRes.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  if (!reportData) {
    return (
      <div className="dashboard-upload">
        <motion.div className="upload-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="upload-header">
            <h1>⚡ Runtime Authority Cloud</h1>
            <p className="tagline">Continuous Authority Verification</p>
            <p className="sub-tagline">Monitor · Replay · Prove · <span>Authority</span> for every AI execution</p>
          </div>
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <div className="dropzone-content">
              <div className="dropzone-icon">📁</div>
              <h3>Upload Trace</h3>
              <p>or Connect Platform</p>
              <span className="dropzone-hint">JSON files only</span>
            </div>
          </div>
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Processing trace...</p>
            </div>
          )}
          {uploadedFile && !loading && (
            <div className="uploaded-file">
              <span>✓</span>
              <span>{uploadedFile}</span>
            </div>
          )}
          <div className="upload-features">
            <div className="feature-item"><span>🔐</span><span>Cryptographically verified</span></div>
            <div className="feature-item"><span>🔁</span><span>Independently replayable</span></div>
            <div className="feature-item"><span>📊</span><span>Executive ready reports</span></div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---- Data ----
  const isInvalid = reportData.overall_status === 'FAIL';
  const authorityStatus = isInvalid ? 'INVALID' : 'VALID';
  const statusClass = isInvalid ? 'danger' : 'success';
  const statusDisplay = isInvalid ? 'Execution denied' : 'Execution allowed';
  const reason = reportData.drift_events?.length > 0 ? 'Delegation chain broken' : 'Policy drift detected';

  // Status
  const statusData = {
    status: authorityStatus,
    statusClass,
    statusDisplay,
    reason,
    authorityId: 'AUTH-847238',
    verified: '12 sec ago',
    confidence: reportData.risk_analysis?.score || 96,
    policyVersion: isInvalid ? 'v5.2 → v5.3' : 'v5.3 (active)',
    delegationDepth: isInvalid ? '3 → 2' : '3 (intact)',
    evidenceTTL: isInvalid ? 'Expired' : 'Valid',
    decisionTime: '14:23:12 UTC'
  };

  // Copilot
  const copilotData = {
    recommendation: isInvalid ? 'STOP EXECUTION' : 'Continue Execution',
    reason: isInvalid ? 'Delegation chain changed' : 'All authority checks passed',
    actions: isInvalid ? ['Reauthorize', 'Refresh Evidence', 'Recompute Authority'] : ['Monitor', 'Export Certificate', 'Schedule Review'],
    estimatedTime: isInvalid ? '2 min' : 'N/A'
  };

  // Graph
  const graphNodes = [
    { id: 'human', label: 'Human', status: 'healthy' },
    { id: 'manager', label: 'Manager', status: 'healthy' },
    { id: 'approval', label: 'Approval', status: 'healthy' },
    { id: 'policy', label: 'Policy', status: isInvalid ? 'danger' : 'healthy' },
    { id: 'evidence', label: 'Evidence', status: isInvalid ? 'danger' : 'healthy' },
    { id: 'tool', label: 'Tool', status: isInvalid ? 'danger' : 'healthy' },
    { id: 'agent', label: 'Agent', status: isInvalid ? 'danger' : 'healthy' },
    { id: 'execution', label: 'Execution', status: isInvalid ? 'danger' : 'healthy' },
  ];

  const graphEdges = [
    { from: 'human', to: 'manager', status: 'active' },
    { from: 'manager', to: 'approval', status: 'active' },
    { from: 'approval', to: 'policy', status: isInvalid ? 'danger' : 'active' },
    { from: 'policy', to: 'evidence', status: isInvalid ? 'danger' : 'active' },
    { from: 'evidence', to: 'tool', status: isInvalid ? 'danger' : 'active' },
    { from: 'tool', to: 'agent', status: isInvalid ? 'danger' : 'active' },
    { from: 'agent', to: 'execution', status: isInvalid ? 'danger' : 'active' },
  ];

  const graphData = { nodes: graphNodes, edges: graphEdges };

  // Certificate – with cryptographic fields and trust chain
  const certificateData = {
    status: isInvalid ? 'INVALID' : 'VALID',
    authority: isInvalid ? '0%' : '96%',
    issued: '14:23 UTC',
    expires: '14:31 UTC',
    replayAvailable: 'Available',
    verifier: 'DecisionAssure Runtime',
    traceHash: 'SHA256: 0x82374a9f...',
    signedBy: 'Runtime Authority Cloud',
    signature: '0x7f3a9c2e4b1d8f6a...',
    publicKeyId: 'RAC-2026-07-05-001',
    verificationTime: '14:23:12 UTC',
    replayId: 'RPL-847238',
    trustChain: 'Root CA → Intermediate → RAC',
  };

  // History
  const historyData = {
    values: isInvalid ? [98, 96, 92, 81, 41, 18, 0] : [98, 96, 97, 95, 94, 96, 96],
    labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'Now']
  };

  // Evidence – with rich metadata for each type
  const evidenceData = [
    {
      name: 'JWT',
      detail: 'Expires in 4 min',
      status: 'healthy',
      issuer: 'OpenAI',
      expiry: '14:31 UTC',
      ttl: '3m',
      hash: 'SHA256: 0x7a3f...',
      updatedAt: '14:22:18 UTC'
    },
    {
      name: 'OIDC Token',
      detail: isInvalid ? 'Expired' : 'Valid',
      status: isInvalid ? 'expired' : 'healthy',
      issuer: 'Microsoft',
      expiry: '14:28 UTC',
      ttl: isInvalid ? '0m' : '12m',
      hash: 'SHA256: 0xb83c...',
      updatedAt: '14:28:01 UTC'
    },
    {
      name: 'Policy',
      detail: isInvalid ? 'Version 5.3, Updated 12 sec ago' : 'Version 5.3, Active',
      status: isInvalid ? 'changed' : 'healthy',
      issuer: 'Platform',
      expiry: 'N/A',
      ttl: 'N/A',
      hash: 'SHA256: 0x9f2147a3...',
      updatedAt: isInvalid ? '14:23:00 UTC' : '14:10:00 UTC',
      version: '5.3',
      commit: '7a3f9c2',
      publisher: 'Platform Security',
      repository: 'github.com/org/policy-repo',
      affectedPermissions: 'database.write, code.patch.apply, config.update'
    },
    {
      name: 'Delegation',
      detail: isInvalid ? 'Changed' : 'Intact',
      status: isInvalid ? 'changed' : 'healthy',
      issuer: 'Org',
      expiry: 'N/A',
      ttl: 'N/A',
      hash: 'SHA256: 0x4d7e1f2a...',
      updatedAt: '14:22:18 UTC',
      depth: '3 → 2',
      chain: 'root → admin → finance',
      scope: 'finance → operations → execution'
    },
    {
      name: 'Identity',
      detail: 'Rotated',
      status: 'rotated',
      issuer: 'Entra',
      expiry: '14:45 UTC',
      ttl: '14m',
      hash: 'SHA256: 0x2a8c4d7e...',
      updatedAt: '14:15:00 UTC',
      type: 'Service Account',
      id: 'agent:synth-coder-001',
      rotatedAt: '14:15:00 UTC'
    },
    {
      name: 'Capabilities',
      detail: isInvalid ? 'database.delete removed' : 'All permissions active',
      status: isInvalid ? 'restricted' : 'healthy',
      issuer: 'Policy',
      expiry: 'N/A',
      ttl: 'N/A',
      hash: 'SHA256: 0x6b1d3f2a...',
      updatedAt: '14:22:18 UTC',
      added: 'database.read',
      removed: 'database.delete',
      activePermissions: 'database.read, config.view, logs.query'
    },
  ];

  // Drift – with timestamp
  const driftData = {
    identity: 'None',
    capability: isInvalid ? 'Detected' : 'None',
    policy: isInvalid ? 'Major' : 'None',
    delegation: isInvalid ? 'Minor' : 'None',
    evidence: isInvalid ? 'Expired' : 'None',
    overall: isInvalid ? 'HIGH' : 'LOW',
    primaryCause: isInvalid ? 'Policy version changed during execution' : 'No drift detected',
    timestamp: '2026-07-05T14:22:18Z'
  };

  // Trust
  const trustData = [
    { name: 'SOC2', status: '✅' },
    { name: 'ISO27001', status: '✅' },
    { name: 'EU AI Act', status: 'Ready' },
    { name: 'NIST AI RMF', status: 'Mapped' },
    { name: 'DORA', status: 'Ready' },
    { name: 'OWASP LLM', status: 'Compliant' },
  ];

  // DNA
  const dnaData = {
    identity: { status: 'Verified', value: 92 },
    delegation: { status: isInvalid ? 'Broken' : 'Verified', value: isInvalid ? 45 : 88 },
    evidence: { status: isInvalid ? 'Expired' : 'Verified', value: isInvalid ? 40 : 85 },
    policy: { status: isInvalid ? 'Updated' : 'Verified', value: isInvalid ? 30 : 90 },
    capability: { status: isInvalid ? 'Restricted' : 'Verified', value: isInvalid ? 55 : 78 }
  };

  // Executive Report – with board summary and technical appendix
  const executiveData = {
    authority: isInvalid ? 'INVALID' : 'VALID',
    reason: isInvalid ? 'Policy Drift' : 'All checks passed',
    severity: isInvalid ? 'Critical' : 'Low',
    recommendation: isInvalid ? 'Stop Execution' : 'Continue',
    potentialExposure: isInvalid ? '$3.4M' : '$0',
    affectedSystems: isInvalid ? '14' : '0',
    affectedAgents: isInvalid ? '18' : '0',
    recommendedOwner: isInvalid ? 'Platform Security' : 'N/A',
    eta: isInvalid ? '2 min' : 'N/A',
    boardSummary: isInvalid
      ? 'Execution was blocked because policy v5.2 changed to v5.3 after approval, invalidating delegated authority.'
      : 'All authority checks passed. Execution is safe to continue.',
    technicalAppendix: isInvalid
      ? 'Delegation chain shortened from depth 3 to 2. Policy version mismatch: v5.2 vs v5.3. Evidence TTL expired (612s > 600s).'
      : 'No drift detected. All authority trails intact.'
  };

  // Compare
  const compareData = {
    yesterday: 98,
    today: isInvalid ? 41 : 96,
    chain: ['Policy Drift', 'Delegation Changed', 'Evidence Expired'],
    yesterdayVersion: '5.2',
    todayVersion: '5.3',
    yesterdayEvidence: 'Valid',
    todayEvidence: 'Expired'
  };

  // Replay steps – with timestamps
  const replaySteps = [
    { step: 1, title: 'Approved', status: 'success', confidence: 100, timestamp: '14:22:00 UTC' },
    { step: 2, title: 'Capability Added', status: 'info', confidence: 97, timestamp: '14:22:05 UTC' },
    { step: 3, title: 'Policy Updated', status: 'warning', confidence: 82, timestamp: '14:22:10 UTC' },
    { step: 4, title: 'Delegation Changed', status: 'warning', confidence: 61, timestamp: '14:22:12 UTC' },
    { step: 5, title: 'Evidence Expired', status: 'danger', confidence: 18, timestamp: '14:22:15 UTC' },
    { step: 6, title: 'Execution Denied', status: 'danger', confidence: 0, timestamp: '14:22:18 UTC' },
  ];

  // API endpoints
  const apiEndpoints = [
    { method: 'POST', path: '/authority/verify', desc: 'Verify authority continuity' },
    { method: 'POST', path: '/authority/replay', desc: 'Replay execution trace' },
    { method: 'GET', path: '/authority/status', desc: 'Get current authority status' },
    { method: 'GET', path: '/authority/certificate', desc: 'Get authority certificate' },
    { method: 'GET', path: '/authority/lifecycle', desc: 'Get authority lifecycle' },
    { method: 'POST', path: '/authority/analyze', desc: 'Analyze authority trail' },
    { method: 'GET', path: '/authority/drift', desc: 'Get drift events' },
    { method: 'GET', path: '/authority/report', desc: 'Get executive report' },
  ];

  // Live Systems
  const liveSystems = [
    { name: 'Microsoft', status: 'active' },
    { name: 'Anthropic', status: 'active' },
    { name: 'Google ADK', status: 'active' },
    { name: 'OpenAI', status: 'active' },
    { name: 'CrewAI', status: 'active' },
    { name: 'LangGraph', status: 'warning' },
    { name: 'Claude', status: 'active' },
    { name: 'MCP', status: 'warning' },
    { name: 'AutoGen', status: 'inactive' },
  ];

  // Lifecycle steps – with timestamps
  const lifecycleSteps = [
    { step: 1, title: 'Approve', desc: 'Initial authorization granted', detail: 'Hash: 0x7a3f...', status: 'success', confidence: 100, timestamp: '14:22:00 UTC' },
    { step: 2, title: 'Memory Updated', desc: 'Agent memory state changed', detail: 'Delta: +3 records', status: 'info', confidence: 100, timestamp: '14:22:05 UTC' },
    { step: 3, title: 'Capability Added', desc: 'New tool permission granted', detail: 'Tool: database.write', status: 'info', confidence: 89, timestamp: '14:22:08 UTC' },
    { step: 4, title: 'Delegation Modified', desc: 'Delegation chain changed', detail: 'Depth: 3 → 2', status: 'warning', confidence: 63, timestamp: '14:22:12 UTC' },
    { step: 5, title: 'Policy Updated', desc: 'Policy version changed mid-execution', detail: 'v4.1 → v4.2', status: 'warning', confidence: 41, timestamp: '14:22:14 UTC' },
    { step: 6, title: 'Evidence Expired', desc: 'Attestation freshness expired', detail: 'TTL: 600s elapsed', status: 'danger', confidence: 18, timestamp: '14:22:16 UTC' },
    { step: 7, title: 'Execution Blocked', desc: 'Action denied at commit boundary', detail: 'Gate state: DENIED', status: 'danger', confidence: 0, timestamp: '14:22:18 UTC' },
  ];

  // Cost
  const costData = {
    potentialIncident: isInvalid ? '$1.2M' : '$0',
    complianceExposure: isInvalid ? '$300k' : '$0',
    recoveryCost: isInvalid ? '$40k' : '$0',
    timeSaved: isInvalid ? '8 hours' : 'N/A'
  };

  // ---- Render ----
  return (
    <div className="dashboard-content">
      <GlobalSearch />
      <AuthorityStatus data={statusData} />
      
      <div className="dashboard-tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'lifecycle' ? 'active' : ''} onClick={() => setActiveTab('lifecycle')}>Lifecycle</button>
        <button className={activeTab === 'replay' ? 'active' : ''} onClick={() => setActiveTab('replay')}>Replay</button>
        <button className={activeTab === 'drift' ? 'active' : ''} onClick={() => setActiveTab('drift')}>Drift</button>
        <button className={activeTab === 'evidence' ? 'active' : ''} onClick={() => setActiveTab('evidence')}>Evidence</button>
        <button className={activeTab === 'compare' ? 'active' : ''} onClick={() => setActiveTab('compare')}>Compare</button>
        <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>Report</button>
        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>History</button>
        <button className={activeTab === 'systems' ? 'active' : ''} onClick={() => setActiveTab('systems')}>Systems</button>
        <button className={activeTab === 'api' ? 'active' : ''} onClick={() => setActiveTab('api')}>API</button>
      </div>

      <div className="dashboard-grid">
        {activeTab === 'overview' && (
          <>
            <AuthorityCopilot data={copilotData} />
            <AuthorityGraph data={graphData} />
            <AuthorityDNA data={dnaData} />
            <DriftSummary data={driftData} />
            <CostEstimation data={costData} />
            <TrustIndicators data={trustData} />
            <LiveSystems systems={liveSystems} />
            <AskAI />
          </>
        )}
        {activeTab === 'lifecycle' && <AuthorityLifecycle steps={lifecycleSteps} full />}
        {activeTab === 'replay' && <ReplayViewer steps={replaySteps} traceId={reportData.trace_id} />}
        {activeTab === 'drift' && <DriftSummary data={driftData} full />}
        {activeTab === 'evidence' && <EvidenceExplorer evidence={evidenceData} />}
        {activeTab === 'compare' && <CompareMode data={compareData} />}
        {activeTab === 'report' && <EnterpriseReport data={executiveData} />}
        {activeTab === 'history' && <AuthorityHistory data={historyData} />}
        {activeTab === 'systems' && <LiveSystems systems={liveSystems} full />}
        {activeTab === 'api' && <APIsPage endpoints={apiEndpoints} />}
      </div>

      <AuthorityCertificate data={certificateData} />
    </div>
  );
}

export default Dashboard;