import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { 
  FaEdit, 
  FaUser, 
  FaEnvelope, 
  FaBullseye, 
  FaBirthdayCake, 
  FaRulerVertical, 
  FaWeight, 
  FaSave,
  FaChartLine,
  FaUserCircle
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, getProfile } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const userData = useSelector((state) => state.getUserProfile.userInfo);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: '',
    age: '',
    height: '',
    weight: '',
    bio: '',
    fitnessLevel: 'beginner'
  });

  // Edit mode states
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    goals: false,
    age: false,
    height: false,
    weight: false,
    bio: false,
    fitnessLevel: false
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        goals: userData.goals || '',
        age: userData.age || '',
        height: userData.height || '',
        weight: userData.weight || '',
        bio: userData.bio || 'Fitness enthusiast dedicated to achieving goals',
        fitnessLevel: userData.fitnessLevel || 'beginner'
      });
    }
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await dispatch(updateProfile(formData)).unwrap();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Reset all edit modes after successful update
      setIsEditable({
        name: false,
        email: false,
        goals: false,
        age: false,
        height: false,
        weight: false,
        bio: false,
        fitnessLevel: false
      });

      // Refresh profile data
      setTimeout(() => {
        dispatch(getProfile());
        navigate('/profile');
      }, 1500);

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return null;
    const heightInMeters = formData.height / 100;
    const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? 
    bmi < 18.5 ? 'Underweight' :
    bmi < 25 ? 'Normal' :
    bmi < 30 ? 'Overweight' : 'Obese'
    : null;

  // Fitness level options
  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  return (
    <div className="profile-wrapper">
      <Container fluid="xxl" className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="header-content">
            <div className="header-icon">
              <FaUserCircle />
            </div>
            <div>
              <h1 className="profile-title">Your Profile</h1>
              <p className="profile-subtitle">Manage your personal information and fitness preferences</p>
            </div>
          </div>
        </div>

        <Row className="g-4">
          {/* Left Column - User Info Card */}
          <Col lg={4}>
            <div className="user-card">
              <div className="user-avatar">
                <FaUserCircle className="avatar-icon" />
                <div className="user-status online"></div>
              </div>
              <div className="user-info">
                <h3 className="user-name">{formData.name || 'User Name'}</h3>
                <p className="user-email">{formData.email || 'user@example.com'}</p>
                <div className="user-badge">
                  <FaChartLine className="me-1" />
                  {formData.fitnessLevel ? formData.fitnessLevel.charAt(0).toUpperCase() + formData.fitnessLevel.slice(1) : 'Beginner'} Level
                </div>
              </div>

              {/* Stats Card */}
              <div className="stats-card">
                <div className="stat-item">
                  <div className="stat-icon">
                    <FaRulerVertical />
                  </div>
                  <div className="stat-content">
                    <h4>{formData.height || '--'} cm</h4>
                    <p>Height</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <FaWeight />
                  </div>
                  <div className="stat-content">
                    <h4>{formData.weight || '--'} kg</h4>
                    <p>Weight</p>
                  </div>
                </div>
                {bmi && (
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaChartLine />
                    </div>
                    <div className="stat-content">
                      <h4>{bmi}</h4>
                      <p>BMI ({bmiCategory})</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions - Removed completely */}
            </div>
          </Col>

          {/* Right Column - Profile Form */}
          <Col lg={8}>
            <div className="profile-form-section">
              {message.text && (
                <div className={`alert-message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <Form onSubmit={handleUpdateProfile}>
                <div className="form-section-header">
                  <h3 className="section-title">
                    <FaUser className="me-2" />
                    Personal Information
                  </h3>
                  <p className="section-subtitle">Update your basic profile details</p>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaUser className="me-2" />
                        Full Name
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          readOnly={!isEditable.name}
                          className={`form-control-custom ${!isEditable.name ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('name')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaEnvelope className="me-2" />
                        Email Address
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          readOnly={!isEditable.email}
                          className={`form-control-custom ${!isEditable.email ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('email')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="g-3 mt-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaBirthdayCake className="me-2" />
                        Age
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          readOnly={!isEditable.age}
                          className={`form-control-custom ${!isEditable.age ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('age')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        Fitness Level
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Select
                          value={formData.fitnessLevel}
                          onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
                          className="form-control-custom"
                          disabled={!isEditable.fitnessLevel}
                        >
                          {fitnessLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </Form.Select>
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('fitnessLevel')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-section-header mt-4">
                  <h3 className="section-title">
                    <FaBullseye className="me-2" />
                    Fitness Details
                  </h3>
                  <p className="section-subtitle">Track your physical metrics and goals</p>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaRulerVertical className="me-2" />
                        Height (cm)
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="number"
                          step="0.1"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          readOnly={!isEditable.height}
                          className={`form-control-custom ${!isEditable.height ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('height')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaWeight className="me-2" />
                        Weight (kg)
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="number"
                          step="0.1"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          readOnly={!isEditable.weight}
                          className={`form-control-custom ${!isEditable.weight ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('weight')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="g-3 mt-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaBullseye className="me-2" />
                        Fitness Goals
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={formData.goals}
                          placeholder="Describe your fitness goals (e.g., Lose weight, Build muscle, Improve endurance)"
                          onChange={(e) => handleInputChange('goals', e.target.value)}
                          readOnly={!isEditable.goals}
                          className={`form-control-custom ${!isEditable.goals ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('goals')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="g-3 mt-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="form-label">
                        <FaUser className="me-2" />
                        Bio
                      </Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={formData.bio}
                          placeholder="Tell us about yourself and your fitness journey"
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          readOnly={!isEditable.bio}
                          className={`form-control-custom ${!isEditable.bio ? 'read-only' : ''}`}
                        />
                        <button
                          type="button"
                          className="edit-toggle"
                          onClick={() => toggleEdit('bio')}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-actions mt-4">
                  <Button
                    type="submit"
                    className="save-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-light"
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditable({
                        name: false,
                        email: false,
                        goals: false,
                        age: false,
                        height: false,
                        weight: false,
                        bio: false,
                        fitnessLevel: false
                      });
                      if (userData) {
                        setFormData({
                          name: userData.name || '',
                          email: userData.email || '',
                          goals: userData.goals || '',
                          age: userData.age || '',
                          height: userData.height || '',
                          weight: userData.weight || '',
                          bio: userData.bio || '',
                          fitnessLevel: userData.fitnessLevel || 'beginner'
                        });
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;