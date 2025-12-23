import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Or wherever your main CSS is
import './Signup.css';

// Try different import paths for AppNavbar based on your project structure
// Common locations:
// import AppNavbar from '../components/AppNavbar'; // If it's in components folder
// import AppNavbar from '../AppNavbar'; // If it's in src folder
// import AppNavbar from './AppNavbar'; // If it's in pages folder

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.userRegister);

  // Prevent scrolling on signup page only
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      {/* Temporarily remove AppNavbar until we fix the import */}
      <div className="signup-page">
        <div className="signup-background"></div>
        
        <Container className="signup-container">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={10} lg={8}>
              <Card className="signup-card">
                <Row className="g-0">
                  {/* Left Side - Branding */}
                  <Col md={6} className="signup-brand-side">
                    <div className="signup-brand-content">
                      <h1 className="signup-brand-title">Join FitnessTrack</h1>
                      <p className="signup-brand-subtitle">
                        Start your fitness journey today! Track workouts, monitor progress, and achieve your goals.
                      </p>
                      
                      <div className="signup-benefits">
                        <div className="benefit-item">
                          <div className="benefit-icon">
                            <i className="fas fa-bullseye"></i>
                          </div>
                          <div className="benefit-text">
                            <h5>Set & Track Goals</h5>
                            <p>Define and monitor your fitness objectives</p>
                          </div>
                        </div>
                        
                        <div className="benefit-item">
                          <div className="benefit-icon">
                            <i className="fas fa-history"></i>
                          </div>
                          <div className="benefit-text">
                            <h5>Progress History</h5>
                            <p>View your complete workout history</p>
                          </div>
                        </div>
                        
                        <div className="benefit-item">
                          <div className="benefit-icon">
                            <i className="fas fa-chart-pie"></i>
                          </div>
                          <div className="benefit-text">
                            <h5>Detailed Analytics</h5>
                            <p>Get insights with comprehensive reports</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  
                  {/* Right Side - Signup Form */}
                  <Col md={6} className="signup-form-side">
                    <Card.Body className="signup-card-body">
                      <h2 className="signup-form-title">Sign Up</h2>
                      <p className="signup-form-subtitle">Fill in your details to get started</p>

                      {loading && <div className="text-center mb-3"><Spinner animation="border" /></div>}
                      {error && <Alert variant="danger" className="signup-alert">{error}</Alert>}

                      <Form onSubmit={handleSubmit} className="signup-form">
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label className="form-label">Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Button 
                          type="submit" 
                          className="signup-button w-100"
                          disabled={loading}
                        >
                          {loading ? 'Creating Account...' : 'Signup'}
                        </Button>
                      </Form>
                      
                      <div className="login-link text-center mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="login-link-text">
                          Login
                        </a>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Signup;