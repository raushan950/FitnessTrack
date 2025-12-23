import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Container, Image, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../redux/actions/authActions';
import "../index.css";
import "./Navbar.css"; // Add this import
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaChartLine, FaHome, FaDumbbell, FaAppleAlt, FaCrown, FaCog, FaTrophy, FaStar } from 'react-icons/fa';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll for navbar effects
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setShowModal(false);
  };

  const openLogoutModal = () => {
    setShowModal(true);
  };

  // Navigation links for logged-in users
  const navLinks = [
    { path: '/home', label: 'Dashboard', icon: <FaHome className="nav-icon" /> },
    { path: '/workouts', label: 'Workouts', icon: <FaDumbbell className="nav-icon" /> },
    { path: '/diet', label: 'Nutrition', icon: <FaAppleAlt className="nav-icon" /> },
    { path: '/progress', label: 'Progress', icon: <FaChartLine className="nav-icon" /> },
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top"
        className={`app-navbar ${scrolled ? 'scrolled' : ''}`}
        variant="dark"
      >
        <Container fluid="xxl" className="navbar-container">
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="brand-wrapper">
            <div className="brand-content">
              <div className="brand-logo">
                <FaDumbbell className="brand-icon" />
              </div>
              <div className="brand-text">
                <span className="brand-fitness">Fitness</span>
                <span className="brand-track">Track</span>
                <span className="brand-beta">PRO</span>
              </div>
            </div>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggle">
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="navbar-collapse-wrapper">
            {/* Navigation Links - Centered */}
            <Nav className="navbar-links">
              {userInfo && navLinks.map((link) => (
                <LinkContainer key={link.path} to={link.path}>
                  <Nav.Link className="nav-link-item">
                    {link.icon}
                    <span className="nav-link-label">{link.label}</span>
                    <span className="nav-link-underline"></span>
                  </Nav.Link>
                </LinkContainer>
              ))}
            </Nav>

            {/* User Profile Section */}
            <div className="navbar-user-section">
              {userInfo ? (
                <Dropdown align="end" className="user-dropdown">
                  <Dropdown.Toggle variant="link" className="user-toggle">
                    <div className="user-avatar-wrapper">
                      <div className="user-avatar">
                        {userInfo.profileImage ? (
                          <Image 
                            src={userInfo.profileImage} 
                            roundedCircle 
                            className="avatar-image"
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            <FaUserCircle className="avatar-icon" />
                          </div>
                        )}
                        <span className="user-status online"></span>
                      </div>
                      <div className="user-info">
                        <div className="user-name">{userInfo.name || 'User'}</div>
                        <div className="user-email">{userInfo.email}</div>
                      </div>
                      <FaCrown className="user-premium-icon" />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu-custom">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">
                        {userInfo.profileImage ? (
                          <Image 
                            src={userInfo.profileImage} 
                            roundedCircle 
                            className="dropdown-avatar-img"
                          />
                        ) : (
                          <div className="dropdown-avatar-placeholder">
                            <FaUserCircle className="dropdown-avatar-icon" />
                          </div>
                        )}
                      </div>
                      <div className="dropdown-user-details">
                        <h6 className="dropdown-user-name">{userInfo.name || 'User'}</h6>
                        <p className="dropdown-user-email">{userInfo.email}</p>
                        <div className="user-badge">
                          <FaStar className="me-1" />
                          <span>Premium Member</span>
                        </div>
                      </div>
                    </div>

                    <Dropdown.Divider className="dropdown-divider" />

                    <Dropdown.Item as={Link} to="/profile" className="dropdown-item">
                      <FaUserCircle className="dropdown-item-icon" />
                      <span>My Profile</span>
                    </Dropdown.Item>
                    
                    <Dropdown.Item as={Link} to="/settings" className="dropdown-item">
                      <FaCog className="dropdown-item-icon" />
                      <span>Settings</span>
                    </Dropdown.Item>
                    
                    <Dropdown.Item as={Link} to="/achievements" className="dropdown-item">
                      <FaTrophy className="dropdown-item-icon" />
                      <span>Achievements</span>
                    </Dropdown.Item>

                    <Dropdown.Divider className="dropdown-divider" />

                    <Dropdown.Item 
                      onClick={openLogoutModal} 
                      className="dropdown-item logout-item"
                    >
                      <FaSignOutAlt className="dropdown-item-icon" />
                      <span>Logout</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="auth-buttons">
                  <Button 
                    as={Link} 
                    to="/signup" 
                    variant="outline-light" 
                    className="auth-btn signup-btn"
                  >
                    Sign Up
                  </Button>
                  <Button 
                    as={Link} 
                    to="/login" 
                    variant="primary" 
                    className="auth-btn login-btn"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        className="logout-modal-custom"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            <FaSignOutAlt className="me-2" />
            Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="logout-modal-content">
            <div className="logout-icon-wrapper">
              <FaSignOutAlt className="logout-icon" />
            </div>
            <h5 className="logout-title">Ready to leave?</h5>
            <p className="logout-message">
              You'll need to sign in again to access your fitness dashboard.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowModal(false)}
            className="modal-btn cancel-btn"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleLogout}
            className="modal-btn confirm-btn"
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;