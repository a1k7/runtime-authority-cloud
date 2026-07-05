import React from 'react';
import { motion } from 'framer-motion';

function CostEstimation({ data }) {
  const { potentialIncident, complianceExposure, recoveryCost, timeSaved } = data;

  return (
    <motion.div 
      className="card cost-estimation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="card-header">
        <h3>💰 Cost Estimation</h3>
      </div>
      
      <div className="card-body">
        <div className="cost-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: '#1a1a2e',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#e17055' }}>{potentialIncident}</div>
            <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Potential Incident Cost</div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: '#1a1a2e',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#fdcb6e' }}>{complianceExposure}</div>
            <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Compliance Exposure</div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: '#1a1a2e',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#e8e8f0' }}>{recoveryCost}</div>
            <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recovery Cost</div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: '#1a1a2e',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#00b894' }}>{timeSaved}</div>
            <div style={{ fontSize: '11px', color: '#6a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time Saved</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CostEstimation;