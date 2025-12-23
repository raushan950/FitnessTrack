import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal, getMeal, removeMeal } from '../redux/actions/dietActions';
import { FaTrashAlt, FaAppleAlt, FaFire, FaDrumstickBite, FaOilCan, FaBreadSlice, FaCalendarAlt } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import './DietPlan.css';

const DietPlan = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  const meals = useSelector((state) => state.meals.mealList);

  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mealId, setMealId] = useState('');

  // Calculate totals
  const calculateTotals = () => {
    return meals.reduce((totals, meal) => {
      totals.calories += meal.calories || 0;
      totals.protein += meal.proteins || 0;
      totals.fats += meal.fats || 0;
      totals.carbs += meal.carbs || 0;
      return totals;
    }, { calories: 0, protein: 0, fats: 0, carbs: 0 });
  };

  const totals = calculateTotals();

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!meal || !calories || !protein || !fats || !carbs || !date || 
        calories <= 0 || protein <= 0 || fats <= 0 || carbs <= 0) {
      setError('Please enter valid meal details and ensure all values are positive numbers.');
    } else {
      dispatch(addMeal({ 
        meal: meal, 
        calories: parseInt(calories), 
        proteins: parseFloat(protein),
        fats: parseFloat(fats),
        carbs: parseFloat(carbs),
        date: new Date(date).toISOString().split('T')[0]
      }));
      setMeal('');
      setCalories('');
      setProtein('');
      setFats('');
      setCarbs('');
      setDate('');
      setError(null);
    }
  };

  const handleDeleteClick = (id) => {
    setMealId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeMeal(mealId));
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="diet-plan-wrapper">
      <Container fluid="xxl" className="diet-plan-container">
        {/* Header Section */}
        <div className="diet-header">
          <div className="header-content">
            <div className="header-icon">
              <FaAppleAlt />
            </div>
            <div>
              <h1 className="diet-title">Nutrition Tracker</h1>
              <p className="diet-subtitle">Log meals, track macros, and achieve your dietary goals</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <Row className="stats-row">
          <Col md={3}>
            <div className="stat-card total-calories">
              <div className="stat-icon">
                <FaFire />
              </div>
              <div className="stat-content">
                <h3>{totals.calories}</h3>
                <p>Total Calories</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card total-protein">
              <div className="stat-icon">
                <FaDrumstickBite />
              </div>
              <div className="stat-content">
                <h3>{totals.protein.toFixed(1)}g</h3>
                <p>Protein</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card total-fats">
              <div className="stat-icon">
                <FaOilCan />
              </div>
              <div className="stat-content">
                <h3>{totals.fats.toFixed(1)}g</h3>
                <p>Fats</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card total-carbs">
              <div className="stat-icon">
                <FaBreadSlice />
              </div>
              <div className="stat-content">
                <h3>{totals.carbs.toFixed(1)}g</h3>
                <p>Carbs</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Add Meal Form */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Log New Meal</h2>
            <p className="section-subtitle">Track your nutritional intake</p>
          </div>
          
          {error && (
            <Alert variant="danger" className="form-alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleAddMeal} className="meal-form">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <i className="fas fa-utensils me-2"></i>
                    Meal Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={meal}
                    placeholder="e.g., Breakfast, Lunch, Protein Shake"
                    onChange={(e) => setMeal(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaFire className="me-2" />
                    Calories
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={calories}
                    placeholder="Calories"
                    onChange={(e) => setCalories(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="g-3 mt-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaDrumstickBite className="me-2" />
                    Protein (g)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    value={protein}
                    placeholder="Protein"
                    onChange={(e) => setProtein(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaOilCan className="me-2" />
                    Fats (g)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    value={fats}
                    placeholder="Fats"
                    onChange={(e) => setFats(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaBreadSlice className="me-2" />
                    Carbs (g)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    value={carbs}
                    placeholder="Carbs"
                    onChange={(e) => setCarbs(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaCalendarAlt className="me-2" />
                    Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Button 
              type="submit" 
              className="submit-btn mt-4"
            >
              <i className="fas fa-plus-circle me-2"></i>
              Log Meal
            </Button>
          </Form>
        </div>

        {/* Meals List */}
        <div className="meals-section">
          <div className="section-header">
            <h2 className="section-title">Logged Meals</h2>
            <p className="section-subtitle">
              {meals.length === 0 ? 'No meals logged yet' : `Total: ${meals.length} meals`}
            </p>
          </div>
          
          {meals.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaAppleAlt />
              </div>
              <h4>No Meals Logged</h4>
              <p>Start by adding your first meal above</p>
            </div>
          ) : (
            <Row className="g-4">
              {meals.map((mealItem, index) => (
                <Col key={mealItem._id || index} md={6} lg={4}>
                  <div className="meal-card">
                    <div className="meal-card-header">
                      <h4 className="meal-name">{mealItem.meal}</h4>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(mealItem._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    <div className="meal-date">
                      <FaCalendarAlt className="me-2" />
                      {new Date(mealItem.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="meal-macros">
                      <div className="macro-item calories">
                        <div className="macro-icon">
                          <FaFire />
                        </div>
                        <div className="macro-content">
                          <span className="macro-value">{mealItem.calories}</span>
                          <span className="macro-label">Calories</span>
                        </div>
                      </div>
                      <div className="macro-item protein">
                        <div className="macro-icon">
                          <FaDrumstickBite />
                        </div>
                        <div className="macro-content">
                          <span className="macro-value">{mealItem.proteins}g</span>
                          <span className="macro-label">Protein</span>
                        </div>
                      </div>
                      <div className="macro-item fats">
                        <div className="macro-icon">
                          <FaOilCan />
                        </div>
                        <div className="macro-content">
                          <span className="macro-value">{mealItem.fats}g</span>
                          <span className="macro-label">Fats</span>
                        </div>
                      </div>
                      <div className="macro-item carbs">
                        <div className="macro-icon">
                          <FaBreadSlice />
                        </div>
                        <div className="macro-content">
                          <span className="macro-value">{mealItem.carbs}g</span>
                          <span className="macro-label">Carbs</span>
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
        message="Are you sure you want to delete this meal?"
        title="Delete Meal"
      />
    </div>
  );
};

export default DietPlan;