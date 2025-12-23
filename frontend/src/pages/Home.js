import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <Container className="home-page" style={{ padding: 0 }}>
      <Card className="welcome-section" style={{ position: 'relative', textAlign: 'center', height: '325px',  border: 'none', margin: 20, background: 'black' }}>
        <Card.Img 
          variant="top"
          src="/images/FitnessTrackCoverPhoto.jpg"
          alt="Cover Photo"
          style={{ height: '100%', objectFit: 'cover', margin: 0, padding: 0 }}
        />
        <Card.Body style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          color: 'white',  
          margin: 0
        }}>
          <Card.Title className="card-title-custom" style={{ fontSize: '2rem' }}>Welcome to Fitness Track</Card.Title>
          <Card.Text className="card-text-custom" style={{ fontSize: '1.2rem', padding: 10 }}>
            Your personal fitness journey starts here! Track your workouts, diet, and progress.
          </Card.Text>
        </Card.Body>
      </Card>
      <Dashboard />
    </Container>
  );
};

export default Home;