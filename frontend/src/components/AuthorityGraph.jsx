import React, { useState } from 'react';
import { motion } from 'framer-motion';

function AuthorityGraph({ data }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  let nodes = data?.nodes || [];
  let edges = data?.edges || [];

  if (!nodes || nodes.length === 0) {
    return (
      <div className="card full-width" style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#6a6a8a' }}>No graph data available</p>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    if (status === 'healthy') return '✓';
    if (status === 'warning') return '⚠';
    if (status === 'danger') return '✗';
    return '•';
  };

  const getStatusLabel = (status) => {
    if (status === 'healthy') return 'Healthy';
    if (status === 'warning') return 'Warning';
    if (status === 'danger') return 'Failed';
    return 'Unknown';
  };

  const isDangerPropagating = nodes.some(n => n.status === 'danger');

  return (
    <div className="card authority-graph full-width">
      <div className="card-header">
        <h3>🔗 Authority Graph</h3>
        <span className="card-badge">{nodes.length} nodes</span>
      </div>
      <div className="card-body">
        <div style={{ padding: '8px 0' }}>
          {nodes.map((node, idx) => {
            const isPropagating = isDangerPropagating && idx >= 4;
            const isHovered = hoveredNode === node.id;
            const edge = edges[idx] || { status: 'active' };

            return (
              <React.Fragment key={node.id}>
                {/* Node */}
                <motion.div 
                  className={`graph-node ${node.status} ${isPropagating ? 'propagating' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: isHovered ? '#222244' : '#1a1a2e',
                    border: `2px solid ${node.status === 'healthy' ? '#00b894' : node.status === 'warning' ? '#fdcb6e' : '#e17055'}`,
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    marginLeft: `${idx * 20}px`,
                    cursor: 'pointer',
                    boxShadow: isPropagating ? '0 0 30px rgba(225,112,85,0.2)' : 'none'
                  }}
                >
                  {/* Dependency line */}
                  {idx > 0 && (
                    <motion.div 
                      className="dependency-line"
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      style={{
                        position: 'absolute',
                        left: '-16px',
                        top: '-50%',
                        width: '12px',
                        borderLeft: `2px solid ${edge.status === 'danger' ? '#e17055' : edge.status === 'active' ? '#6c5ce7' : '#2a2a44'}`,
                        borderBottom: `2px solid ${edge.status === 'danger' ? '#e17055' : edge.status === 'active' ? '#6c5ce7' : '#2a2a44'}`,
                        height: 'calc(100% + 20px)',
                        borderBottomLeftRadius: '8px',
                        opacity: isPropagating ? 1 : 0.6,
                        transform: 'translateX(-4px)'
                      }}
                    />
                  )}

                  <span className="node-icon" style={{ fontSize: '18px' }}>
                    {getStatusIcon(node.status)}
                  </span>
                  <span className="node-label" style={{ fontWeight: isPropagating ? '700' : '500' }}>
                    {node.label}
                  </span>
                  
                  {isPropagating && (
                    <span style={{ 
                      fontSize: '10px', 
                      color: '#e17055', 
                      fontWeight: '600',
                      marginLeft: '8px',
                      animation: 'pulse 1s infinite'
                    }}>
                      ⚡ PROPAGATING
                    </span>
                  )}

                  <span style={{ 
                    fontSize: '12px', 
                    color: node.status === 'danger' ? '#e17055' : node.status === 'warning' ? '#fdcb6e' : '#00b894',
                    marginLeft: 'auto',
                    fontWeight: '600'
                  }}>
                    {node.status === 'danger' ? '✗' : node.status === 'warning' ? '⚠' : '✓'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#6a6a8a', marginLeft: '8px' }}>
                    {getStatusLabel(node.status)}
                  </span>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AuthorityGraph;