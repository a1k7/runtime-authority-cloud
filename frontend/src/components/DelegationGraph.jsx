import React from 'react';
import { motion } from 'framer-motion';

function DelegationGraph({ graph }) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];

  return (
    <motion.div 
      className="card delegation-graph"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="card-header">
        <h3>Delegation Graph</h3>
        <span className="card-badge">{nodes.length} nodes</span>
      </div>
      
      <div className="card-body">
        <div className="graph-visual">
          {nodes.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔗</span>
              <p>No delegation data available</p>
            </div>
          ) : (
            <div className="graph-container">
              <div className="graph-nodes">
                {nodes.map((node, index) => (
                  <motion.div 
                    key={index} 
                    className="graph-node"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="node-id">{node.id}</span>
                    <span className="node-label">{node.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="graph-edges">
                {edges.map((edge, index) => (
                  <div key={index} className="graph-edge">
                    <span className="edge-from">{edge.from}</span>
                    <span className="edge-arrow">→</span>
                    <span className="edge-to">{edge.to}</span>
                    <span className="edge-step">(step {edge.step})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default DelegationGraph;