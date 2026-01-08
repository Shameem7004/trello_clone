import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        <div className="header-logo">
          <span className="header-logo-text">Workspace Management</span>
        </div>
      </div>
      
      <div className="header-center">
        <input 
          type="text" 
          className="header-search" 
          placeholder="Search" 
        />
      </div>
      
      <div className="header-right">
        <button className="header-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </button>
        <button className="header-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>
        <button className="header-avatar">MS</button>
      </div>
    </header>
  );
}

export default Header;