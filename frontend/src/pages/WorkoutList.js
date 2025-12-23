import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, fetchWorkouts, removeWorkout } from "../redux/actions/workoutActions";
import { 
  FaDumbbell, 
  FaListOl, 
  FaSortNumericUp, 
  FaSyncAlt, 
  FaPlus, 
  FaMinus, 
  FaTrashAlt,
  FaFire,
  FaChartLine,
  FaClock,
  FaWeightHanging
} from "react-icons/fa";
import ConfirmationModal from '../components/ConfirmationModal';
import "./Workouts.css";

function Workouts() {
  const dispatch = useDispatch();
  const workoutsFromRedux = useSelector((state) => state.workouts.workoutList);

  useEffect(() => {
    dispatch(fetchWorkouts()); // Changed from getWorkout() to fetchWorkouts()
  }, [dispatch]);

  const [workouts, setWorkouts] = useState([{ exercise: "", sets: "", reps: "", weight: "" }]);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const validateWorkout = (workout) => {
    const newErrors = {};
    if (!workout.exercise.trim()) newErrors.exercise = "Exercise name is required";
    if (!workout.sets || workout.sets <= 0) newErrors.sets = "Valid number of sets is required";
    if (!workout.reps || workout.reps <= 0) newErrors.reps = "Valid number of reps is required";
    if (!workout.weight || workout.weight <= 0) newErrors.weight = "Valid weight is required";
    return newErrors;
  };

  const handleWorkoutChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][name] = value;
    setWorkouts(updatedWorkouts);
    
    const updatedErrors = [...errors];
    if (updatedErrors[index]) {
      delete updatedErrors[index][name];
    }
    setErrors(updatedErrors);
  };

  const handleAddWorkout = () => {
    let hasErrors = false;
    const newErrorsArray = workouts.map((workout) => {
      const validationErrors = validateWorkout(workout);
      if (Object.keys(validationErrors).length > 0) {
        hasErrors = true;
      }
      return validationErrors;
    });

    if (hasErrors) {
      setErrors(newErrorsArray);
      return;
    }

    workouts.forEach((workout) => {
      dispatch(addWorkout({
        ...workout,
        sets: parseInt(workout.sets),
        reps: parseInt(workout.reps),
        weight: parseFloat(workout.weight)
      }));
    });

    setWorkouts([{ exercise: "", sets: "", reps: "", weight: "" }]);
    setErrors([]);
  };

  const handleAddRow = () => {
    setWorkouts([...workouts, { exercise: "", sets: "", reps: "", weight: "" }]);
    setErrors([...errors, {}]);
  };

  const handleRemoveRow = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setErrors(updatedErrors);
  };

  const handleDeleteWorkout = (id) => {
    setWorkoutToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (workoutToDelete) {
      dispatch(removeWorkout(workoutToDelete));
    }
    setShowModal(false);
    setWorkoutToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWorkoutToDelete(null);
  };

  // Calculate statistics
  const totalExercises = workoutsFromRedux.length;
  const totalSets = workoutsFromRedux.reduce((total, workout) => total + (workout.sets || 0), 0);
  const totalReps = workoutsFromRedux.reduce((total, workout) => total + (workout.reps || 0), 0);
  const totalWeightLifted = workoutsFromRedux.reduce((total, workout) => total + (workout.weight || 0) * (workout.sets || 0) * (workout.reps || 0), 0);

  return (
    <div className="workouts-wrapper">
      <Container fluid="xxl" className="workouts-container">
        {/* Header Section */}
        <div className="workouts-header">
          <div className="header-content">
            <div className="header-icon">
              <FaDumbbell />
            </div>
            <div>
              <h1 className="workouts-title">Workout Tracker</h1>
              <p className="workouts-subtitle">Log your exercises, track progress, and crush your fitness goals</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <Row className="stats-row">
          <Col md={3}>
            <div className="stat-card exercises">
              <div className="stat-icon">
                <FaListOl />
              </div>
              <div className="stat-content">
                <h3>{totalExercises}</h3>
                <p>Total Exercises</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card sets">
              <div className="stat-icon">
                <FaSortNumericUp />
              </div>
              <div className="stat-content">
                <h3>{totalSets}</h3>
                <p>Total Sets</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card reps">
              <div className="stat-icon">
                <FaSyncAlt />
              </div>
              <div className="stat-content">
                <h3>{totalReps}</h3>
                <p>Total Reps</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card volume">
              <div className="stat-icon">
                <FaWeightHanging />
              </div>
              <div className="stat-content">
                <h3>{totalWeightLifted.toFixed(1)}kg</h3>
                <p>Total Volume</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Add Workout Form */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Log New Exercises</h2>
            <p className="section-subtitle">Add your workout details below</p>
          </div>

          {errors.some((err) => Object.keys(err).length > 0) && (
            <Alert variant="danger" className="form-alert">
              <FaFire className="me-2" />
              Please fill out all required fields correctly
            </Alert>
          )}

          <div className="workout-form-table">
            <div className="table-header">
              <div className="header-cell">Exercise</div>
              <div className="header-cell">Sets</div>
              <div className="header-cell">Reps</div>
              <div className="header-cell">Weight (kg)</div>
              <div className="header-cell">Actions</div>
            </div>

            {workouts.map((workout, index) => (
              <div key={index} className={`form-row ${errors[index] && Object.keys(errors[index]).length > 0 ? 'has-error' : ''}`}>
                <div className="form-cell" data-label="Exercise">
                  <Form.Control
                    type="text"
                    placeholder="e.g., Bench Press, Squats"
                    name="exercise"
                    value={workout.exercise}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    className="form-control-custom"
                  />
                  {errors[index]?.exercise && (
                    <div className="error-text">{errors[index].exercise}</div>
                  )}
                </div>
                <div className="form-cell" data-label="Sets">
                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="Sets"
                    name="sets"
                    value={workout.sets}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    className="form-control-custom"
                  />
                  {errors[index]?.sets && (
                    <div className="error-text">{errors[index].sets}</div>
                  )}
                </div>
                <div className="form-cell" data-label="Reps">
                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="Reps"
                    name="reps"
                    value={workout.reps}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    className="form-control-custom"
                  />
                  {errors[index]?.reps && (
                    <div className="error-text">{errors[index].reps}</div>
                  )}
                </div>
                <div className="form-cell" data-label="Weight">
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="Weight"
                    name="weight"
                    value={workout.weight}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    className="form-control-custom"
                  />
                  {errors[index]?.weight && (
                    <div className="error-text">{errors[index].weight}</div>
                  )}
                </div>
                <div className="form-cell actions-cell" data-label="Actions">
                  <button
                    className="action-btn add-btn"
                    onClick={handleAddRow}
                    title="Add new row"
                  >
                    <FaPlus />
                  </button>
                  {workouts.length > 1 && (
                    <button
                      className="action-btn remove-btn"
                      onClick={() => handleRemoveRow(index)}
                      title="Remove this row"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button 
            className="submit-btn mt-4"
            onClick={handleAddWorkout}
          >
            <FaPlus className="me-2" />
            Save Workout Session
          </Button>
        </div>

        {/* Saved Workouts */}
        <div className="saved-workouts-section">
          <div className="section-header">
            <h2 className="section-title">Saved Workouts</h2>
            <p className="section-subtitle">
              {workoutsFromRedux.length === 0 ? 'No workouts saved yet' : `Total: ${workoutsFromRedux.length} exercises`}
            </p>
          </div>

          {workoutsFromRedux.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaDumbbell />
              </div>
              <h4>No Workouts Saved</h4>
              <p>Start by logging your first workout above</p>
            </div>
          ) : (
            <Row className="g-4">
              {workoutsFromRedux.map((workout, index) => (
                <Col key={workout._id || index} md={6} lg={4}>
                  <div className="workout-card">
                    <div className="workout-card-header">
                      <h4 className="workout-name">{workout.exercise}</h4>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteWorkout(workout._id)}
                        title="Delete workout"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    <div className="workout-stats">
                      <div className="stat-item">
                        <div className="stat-icon-small">
                          <FaSortNumericUp />
                        </div>
                        <div className="stat-details">
                          <span className="stat-value">{workout.sets}</span>
                          <span className="stat-label">Sets</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon-small">
                          <FaSyncAlt />
                        </div>
                        <div className="stat-details">
                          <span className="stat-value">{workout.reps}</span>
                          <span className="stat-label">Reps</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon-small">
                          <FaWeightHanging />
                        </div>
                        <div className="stat-details">
                          <span className="stat-value">{workout.weight}kg</span>
                          <span className="stat-label">Weight</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon-small">
                          <FaChartLine />
                        </div>
                        <div className="stat-details">
                          <span className="stat-value">{(workout.sets * workout.reps * workout.weight).toFixed(1)}kg</span>
                          <span className="stat-label">Volume</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>

      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this workout?"
        title="Delete Workout"
      />
    </div>
  );
}

export default Workouts;