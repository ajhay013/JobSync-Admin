import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserCircle, faBuilding, faClipboardList, faBars , faHeadset } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import '../adminresponsive.css'; 

const Layout = ({ username }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track if the sidebar is open or closed
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/admindashboard') {
      setActiveLink(0);
    } else if (path.startsWith('/adminapplicants')){
      setActiveLink(1);
    } else if (path.startsWith('/adminemployers')) {
      setActiveLink(2);
    } else if (path === '/adminjobs') {
      setActiveLink(3);
    }
  }, [location]);

  const getLinkStyle = (linkIndex, path) => {
    const isActive = activeLink === linkIndex || location.pathname === path;
    return {
      color: isActive ? "#007bff" : "#6c757d",
      cursor: "pointer",
      transition: "color 0.3s ease, background-color 0.3s ease, transform 0.3s ease",
      marginLeft: "-10px",
      backgroundColor: isActive ? "#f1f1f1" : "transparent",
      fontSize: "18px",  
      textAlign: "left", 
      padding: "10px 15px", 
      transform: isActive ? "scale(1.05)" : "scale(1)",   
    };
  };

  const handleLinkClick = (linkIndex) => {
    setActiveLink(linkIndex);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="d-flex">
      {/* Hamburger Menu */}
      <button
        className="hamburger-btn"
        onClick={toggleSidebar}
        style={{
          display: 'none',
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'transparent',
          border: 'none',
          fontSize: '24px',
          color: '#333',
          zIndex: 1100,
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar bg-white text-gray-600 p-4 ${isSidebarOpen ? 'open' : 'closed'}`}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '290px', 
          height: '100vh',
          borderRight: '2px solid #ddd',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
          marginTop: '80px',
          zIndex: 1000,
          overflowX: 'hidden',
          paddingRight: '16px',
          transition: 'transform 0.3s ease-in-out',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-250px)', // Slide effect for the sidebar
        }}
      >
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/admindashboard"
              className="nav-link"
              style={getLinkStyle(0, "/admindashboard")}
              onClick={() => handleLinkClick(0)}
            >
              <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '8px' }} /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/adminapplicants"
              className="nav-link"
              style={getLinkStyle(1, "/adminapplicants")}
              onClick={() => handleLinkClick(1)}
            >
              <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} /> Applicants
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/adminemployers"
              className="nav-link"
              style={getLinkStyle(2, "/adminemployers")}
              onClick={() => handleLinkClick(2)}
            >
              <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '8px' }} /> Employers
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/adminjobs"
              className="nav-link"
              style={getLinkStyle(3, "/adminjobs")}
              onClick={() => handleLinkClick(3)}
            >
              <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} /> Jobs
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/adminjobs"
              className="nav-link"
              style={getLinkStyle(3, "/adminjobs")}
              onClick={() => handleLinkClick(3)}
            >
              <FontAwesomeIcon icon={faHeadset} style={{ marginRight: '8px' }} /> Customer Support
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div
        style={{
          marginLeft: isSidebarOpen ? '250px' : '0', // Adjust the main content margin depending on sidebar state
          width: '100%',
          transition: 'margin-left 0.3s ease', 
          padding: '20px', 
        }}
      >
        <div className="content">
          {/* Add your page content here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
