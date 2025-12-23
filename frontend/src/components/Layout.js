import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from './Navbar';
import './Layout.css'; // We'll create this

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="app-wrapper">
      <AppNavbar scrolled={scrolled} />
      <div className="main-content-wrapper">
        <Container fluid="xxl" className="main-container">
          <div className="content-area fade-in">
            {children}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="app-footer">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-dumbbell"></i>
              <span>FitnessTrack</span>
            </div>
            <p className="footer-tagline">Transform Your Fitness Journey</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h6>Quick Links</h6>
              <ul>
                <li><a href="/home">Dashboard</a></li>
                <li><a href="/workout">Workouts</a></li>
                <li><a href="/diet">Nutrition</a></li>
                <li><a href="/progress">Progress</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h6>Support</h6>
              <ul>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h6>Connect</h6>
              <div className="social-links">
                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© 2024 FitnessTrack. All rights reserved.</p>
            <p className="version">v2.1.0</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Layout;