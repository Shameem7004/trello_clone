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
          <svg width="80" height="32" viewBox="0 0 885 260" fill="white">
            <path d="M109.88 24.166h60.044c25.608 0 46.226 20.226 46.226 44.622v117.704c0 24.397-20.618 44.622-46.226 44.622H109.88c-25.608 0-46.226-20.225-46.226-44.622V68.788c0-24.396 20.618-44.622 46.226-44.622zm36.289 154.26V68.788H109.88v117.704h36.289v-8.066zm-36.289 0h36.289m193.619-154.26h60.044c25.608 0 46.226 20.226 46.226 44.622v64.99c0 24.397-20.618 44.623-46.226 44.623h-60.044c-25.608 0-46.226-20.226-46.226-44.622v-64.99c0-24.397 20.618-44.623 46.226-44.623zm36.289 154.26V68.788h-36.289v117.704h36.289v-52.924z"/>
          </svg>
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