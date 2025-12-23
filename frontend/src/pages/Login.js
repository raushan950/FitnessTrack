import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate('/home', { replace: true });
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (loading) {
    return (
      <div className="login-loading">
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="login-container">
        <div className="login-background"></div>
        
        <Container className="login-content">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={10} lg={8} xl={6}>
              <div className="login-card">
                <Row className="g-0">
                  {/* Left Side - Branding & Features */}
                  <Col md={6} className="login-brand-side">
                    <div className="login-brand-content">
                      <div className="brand-logo">
                        <i className="fas fa-dumbbell"></i>
                        <span>FitnessTrack</span>
                      </div>
                      <h1 className="login-brand-title">Welcome Back</h1>
                      <p className="login-brand-subtitle">
                        Sign in to continue your fitness journey and track your progress.
                      </p>
                      
                      <div className="login-features">
                        <div className="feature-item">
                          <div className="feature-icon">
                            <i className="fas fa-dumbbell"></i>
                          </div>
                          <div className="feature-text">
                            <h5>Track Workouts</h5>
                            <p>Log exercises & sets</p>
                          </div>
                        </div>
                        
                        <div className="feature-item">
                          <div className="feature-icon">
                            <i className="fas fa-apple-alt"></i>
                          </div>
                          <div className="feature-text">
                            <h5>Monitor Diet</h5>
                            <p>Calorie & nutrition tracking</p>
                          </div>
                        </div>
                        
                        <div className="feature-item">
                          <div className="feature-icon">
                            <i className="fas fa-chart-line"></i>
                          </div>
                          <div className="feature-text">
                            <h5>View Progress</h5>
                            <p>Visual analytics & charts</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  
                  {/* Right Side - Login Form */}
                  <Col md={6} className="login-form-side">
                    <div className="login-form-content">
                      <h2 className="login-form-title">Sign In</h2>
                      <p className="login-form-subtitle">Enter your details to continue</p>
                      
                      {error && (
                        <Alert variant="danger" className="login-alert">
                          <i className="fas fa-exclamation-circle me-2"></i>
                          {error}
                        </Alert>
                      )}
                      
                      <Form onSubmit={handleSubmit} className="login-form">
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Button 
                          type="submit" 
                          className="login-button w-100 mt-3"
                          block="true"
                        >
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Login
                        </Button>
                      </Form>
                      
                      <div className="signup-link text-center mt-4">
                        New to FitnessTrack?{' '}
                        <a href="/signup" className="signup-link-text">
                          Create Account
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Login;