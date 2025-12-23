import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';  // FontAwesome Edit Icon
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, getProfile } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const userData = useSelector((state)=> state.getUserProfile.userInfo)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goals, setGoals] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setGoals(userData.goals || '');
      setAge(userData.age || '');
      setHeight(userData.height || '');
      setWeight(userData.weight || '');
    }
  }, [userData]);

  console.log('userdata=>', userData);
  
  // States to handle which field is being edited
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    goals: false,
    age: false,
    height: false,
    weight: false
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Profile Updated:', { name, email, goals, age, height, weight });
    const profileData = { name, email, goals, age, height, weight }
    dispatch(updateProfile(profileData))

    navigate('/')
  };

  // Toggle edit mode for specific field
  const toggleEdit = (field) => {
    setIsEditable({ ...isEditable, [field]: !isEditable[field] });
  };

  return (
    <Container className="profile-container mt-5">
      <h2 className="text-center mb-4">Profile</h2>
      <Form onSubmit={handleUpdateProfile}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isEditable.name}
                  className={`input-field ${!isEditable.name ? 'read-only' : ''}`}
                />
                <FaEdit className="edit-icon" onClick={() => toggleEdit('name')} />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!isEditable.email}
                  className={`input-field ${!isEditable.email ? 'read-only' : ''}`}
                />
                <FaEdit className="edit-icon" onClick={() => toggleEdit('email')} />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formGoals">
              <Form.Label>Fitness Goals</Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="text"
                  value={goals}
                  placeholder="Enter your fitness goals"
                  onChange={(e) => setGoals(e.target.value)}
                  readOnly={!isEditable.goals}
                  className={`input-field ${!isEditable.goals ? 'read-only' : ''}`}
                />
                <FaEdit className="edit-icon" onClick={() => toggleEdit('goals')} />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="Number"
                  min="1"
                  value={age}
                  placeholder="Enter your Age"
                  onChange={(e) => setAge(e.target.value)}
                  readOnly={!isEditable.age}
                  className={`input-field ${!isEditable.age ? 'read-only' : ''}`}
                />
                <FaEdit className="edit-icon" onClick={() => toggleEdit('age')} />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Extra fields: Height and Weight */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formHeight">
              <Form.Label>Height</Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="number"
                  min="0"
                  value={height}
                  placeholder="Enter your height"
                  onChange={(e) => setHeight(e.target.value)}
                  readOnly={!isEditable.height}
                  className={`input-field ${!isEditable.height ? 'read-only' : ''}`}
                />
                <FaEdit className="edit-icon" onClick={() => toggleEdit('height')} />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formWeight">
              <Form.Label>Weight</Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="number"
                  min="0"
                  value={weight}
                  placeholder="Enter your weight"
                  onChange={(e) => setWeight(e.target.value)}
                  readOnly={!isEditable.weight}
                  className={`input-field ${!isEditable.weight ? 'read-only' : ''}`}
                />
                <FaEdit className="edit-icon" onClick={() => toggleEdit('weight')} />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="update-button">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
