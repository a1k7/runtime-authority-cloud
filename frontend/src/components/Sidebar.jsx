import React from 'react';
import { motion } from 'framer-motion';

function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: '📊', label: 'Authority Overview', active: true },
    { icon: '⏳', label: 'Authority Timeline' },
    { icon: '🔄', label: 'Authority Drift' },
    { icon: '🎬', label: 'Decision Replay' },
    { icon: '🗺️', label: 'Delegation Map' },
    { icon: '📋', label: 'Evidence Center' },
    { icon: '🎯', label: 'Risk Intelligence' },
    { icon: '📄', label: 'Executive Reports' },
    { icon: '⚡', label: 'Live Systems', badge: '3' },
  ];

  return (
    <motion.aside 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      initial={{ x: -260 }}
      animate={{ x: isOpen ? 0 : -260 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-brand">
        <div className="brand-icon">⚡</div>
        <div className="brand-text">
          <span className="brand-name">Runtime</span>
          <span className="brand-sub">Authority Cloud</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href="#" 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-version">v2.0.0</div>
        <div className="sidebar-status">
          <span className="status-dot"></span>
          <span>Connected</span>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;