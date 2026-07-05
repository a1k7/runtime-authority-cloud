import React from 'react';

function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="header-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Runtime Authority Cloud</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-status">
          <span className="status-dot"></span>
          <span className="status-text">All systems operational</span>
        </div>
      </div>
    </header>
  );
}

export default Header;