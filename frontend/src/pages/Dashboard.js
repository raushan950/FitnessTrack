import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { FaDumbbell, FaAppleAlt, FaChartLine, FaUpload } from 'react-icons/fa'; // Icons
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../redux/actions/workoutActions';
import './WorkoutHistory.css';
import '../index.css'

const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchWorkouts())
  },[dispatch])

  const workouts = useSelector((state)=> state.workouts.workoutList)

  const sortedWorkouts = [...workouts].sort((a,b)=> new Date(b.date) - new Date(a.date))
  const latestWorkout = sortedWorkouts.length>0 ? sortedWorkouts[0] : null

  /* if (error) {
    return <p className="error">Error fetching workouts: {error}</p>;
  } */

  const quotes = ["If it doesn't challenge you, it doesn't change you", "Everybody changed, now it's your turn",
  "The only bad workout is the one that didn't happen", "What hurts today makes you stronger tomorrow", "Slow progress is better than no progress"]

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <FaDumbbell size={50} className="mb-3" />
              <Card.Title>Workouts</Card.Title>
              <Card.Text>Log and track your daily workouts.</Card.Text>
              <Link to="/workouts" className="btn btn-primary workout-btn">
              Go to Workouts
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <FaAppleAlt size={50} className="mb-3" />
              <Card.Title>Diet Plans</Card.Title>
              <Card.Text>Track your daily caloric intake.</Card.Text>
              <Link to="/diet" className="btn btn-primary workout-btn">
              Go to Diet Plan
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <FaChartLine size={50} className="mb-3" />
              <Card.Title>Progress</Card.Title>
              <Card.Text>Monitor your fitness progress.</Card.Text>
              <Link to="/progress" className="btn btn-primary workout-btn">
              Go to Progress
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <FaUpload size={50} className="mb-3" />
              <Card.Title>Transformation  Record</Card.Title>
              <Card.Text>View your transformation progress.</Card.Text>
              <Link to="/transformation" className="btn btn-primary workout-btn">
              Go to Transformation
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-5">
          <Col md={6}>
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              {latestWorkout ? (
                <ul>
                  <li>🏋️‍♂️ Workout: {latestWorkout.exercise} - Completed on {new Date(latestWorkout.date).toLocaleDateString()}</li>
                  <li>💪 Sets: {latestWorkout.sets}   Reps: {latestWorkout.reps}   Weight: {latestWorkout.weight} kgs</li>
                </ul>
              ) : (
                <p>No recent workout logged.</p>
              )}
              <div className="workout-history-button">
                <Link to="/workout-history" className="btn btn-primary workout-btn">
                  View Full Workout History
                </Link>
              </div>
            </div>
            
          </Col>

          <Col md={6}>
            <div className="upcoming-goals">
              <h3>Upcoming Goals</h3>
              <ul>
                <li>🏆 10,000 steps per day for a week (Goal ends 10/05)</li>
                <li>💪 Increase bench press by 5kg by 10/15</li>
                <li>🥗 Stick to a 1800-calorie diet for the next 7 days</li>
              </ul>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={12} className="text-center">
            {/* <div className="motivational-quote">
              <blockquote className="blockquote">
                "The only bad workout is the one that didn't happen." 
              </blockquote>
              <footer className="blockquote-footer">Unknown</footer>
            </div> */}
          
          <Carousel fade>
          {quotes.map((quote,index) => (
            <Carousel.Item key={index} interval={3000}>
              <Carousel.Caption>
                <h3>{quote}</h3>
              </Carousel.Caption>
            </Carousel.Item>
           ))} 
          </Carousel> 
          </Col>
        </Row>
    </Container>
  );
};

export default Dashboard;
