import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../redux/actions/workoutActions';
import { getMeal } from '../redux/actions/dietActions';
import { 
  FaChartLine, 
  FaFire, 
  FaDumbbell, 
  FaAppleAlt, 
  FaTrophy,
  FaCalendarAlt,
  FaWeight,
  FaRunning
} from 'react-icons/fa';
import './Progress.css';

const Progress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(getMeal());
  }, [dispatch]);

  const workouts = useSelector((state) => state.workouts.workoutList || []);
  const diets = useSelector((state) => state.meals.mealList || []);

  // Calculate statistics
  const calculateStats = () => {
    const workoutStats = {
      total: workouts.length,
      totalVolume: workouts.reduce((sum, w) => {
        const weight = w.weight || 0;
        const sets = w.sets || 0;
        const reps = w.reps || 0;
        return sum + (weight * sets * reps);
      }, 0),
      recentWorkouts: workouts.slice(-5)
    };

    workoutStats.avgVolume = workoutStats.total > 0 ? 
      workoutStats.totalVolume / workoutStats.total : 0;

    const dietStats = {
      total: diets.length,
      recentMeals: diets.slice(-5)
    };

    dietStats.avgCalories = dietStats.total > 0 ? 
      diets.reduce((sum, m) => sum + (m.calories || 0), 0) / dietStats.total : 0;
    
    dietStats.avgProtein = dietStats.total > 0 ? 
      diets.reduce((sum, m) => sum + (m.proteins || 0), 0) / dietStats.total : 0;

    return { workoutStats, dietStats };
  };

  const { workoutStats, dietStats } = calculateStats();

  // Prepare workout chart data (last 7 days)
  const prepareWorkoutChartData = () => {
    const recentWorkouts = workouts.slice(-7);
    if (recentWorkouts.length === 0) return { values: [], dates: [] };

    const values = recentWorkouts.map(w => {
      const weight = w.weight || 0;
      const sets = w.sets || 0;
      const reps = w.reps || 0;
      return Math.round(weight * sets * reps);
    });

    const dates = recentWorkouts.map(w => {
      try {
        const date = w.createdAt || w.date || new Date().toISOString();
        return new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      } catch (error) {
        return 'N/A';
      }
    });

    return { values, dates };
  };

  // Prepare diet chart data (last 7 days)
  const prepareDietChartData = () => {
    const recentDiets = diets.slice(-7);
    if (recentDiets.length === 0) return { calories: [], proteins: [], dates: [] };

    const calories = recentDiets.map(m => m.calories || 0);
    const proteins = recentDiets.map(m => m.proteins || 0);
    
    const dates = recentDiets.map(m => {
      try {
        return new Date(m.date || new Date().toISOString()).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      } catch (error) {
        return 'N/A';
      }
    });

    return { calories, proteins, dates };
  };

  const workoutChart = prepareWorkoutChartData();
  const dietChart = prepareDietChartData();

  // Render workout chart
  const renderWorkoutChart = () => {
    if (workoutChart.values.length === 0) {
      return (
        <div className="no-data">
          <FaRunning className="no-data-icon" />
          <p>No workout data yet</p>
        </div>
      );
    }

    const maxValue = Math.max(...workoutChart.values, 1); // Ensure at least 1

    return (
      <div className="simple-chart">
        <div className="chart-bars">
          {/* Grid lines */}
          <div className="chart-grid">
            {[0, 25, 50, 75, 100].map((percent, index) => (
              <div 
                key={index} 
                className="grid-line" 
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>
          
          {/* Bars */}
          {workoutChart.values.map((value, index) => (
            <div 
              key={index} 
              className="chart-bar" 
              style={{ 
                height: `${Math.min(95, (value / maxValue) * 100)}%`
              }}
            >
              <span className="bar-value">{value}kg</span>
            </div>
          ))}
        </div>
        <div className="chart-labels">
          {workoutChart.dates.map((date, index) => (
            <div key={index} className="chart-label">{date}</div>
          ))}
        </div>
      </div>
    );
  };

  // Render diet chart
  const renderDietChart = () => {
    if (dietChart.calories.length === 0) {
      return (
        <div className="no-data">
          <FaAppleAlt className="no-data-icon" />
          <p>No meal data yet</p>
        </div>
      );
    }

    const maxCalories = Math.max(...dietChart.calories, 1);
    const maxProteins = Math.max(...dietChart.proteins, 1);
    const maxValue = Math.max(maxCalories, maxProteins);

    return (
      <div className="simple-chart nutrition-chart">
        <div className="chart-bars">
          {/* Grid lines */}
          <div className="chart-grid">
            {[0, 25, 50, 75, 100].map((percent, index) => (
              <div 
                key={index} 
                className="grid-line" 
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>
          
          {/* Bars for calories */}
          <div className="calories-bars" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {dietChart.calories.map((value, index) => (
              <div 
                key={`calories-${index}`} 
                className="chart-bar" 
                style={{ 
                  height: `${Math.min(95, (value / maxValue) * 100)}%`,
                  background: 'linear-gradient(to top, #ff6b6b, #ff8e8e)'
                }}
              >
                <span className="bar-value">{value}cal</span>
              </div>
            ))}
          </div>
          
          {/* Bars for proteins */}
          <div className="proteins-bars" style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0
          }}>
            {dietChart.proteins.map((value, index) => (
              <div 
                key={`proteins-${index}`} 
                className="chart-bar" 
                style={{ 
                  height: `${Math.min(95, (value / maxValue) * 100)}%`,
                  background: 'linear-gradient(to top, #4ecdc4, #6ee7e7)',
                  width: '20px',
                  margin: '0 15px',
                  opacity: 0.8
                }}
              >
                <span className="bar-value">{value}g</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-labels">
          {dietChart.dates.map((date, index) => (
            <div key={index} className="chart-label">{date}</div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ff6b6b' }}></div>
            <span>Calories</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#4ecdc4' }}></div>
            <span>Protein (g)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="progress-wrapper">
      <Container fluid="xxl" className="progress-container">
        {/* Header Section */}
        <div className="progress-header">
          <div className="header-content">
            <div className="header-icon">
              <FaChartLine />
            </div>
            <div>
              <h1 className="progress-title">Progress Analytics</h1>
              <p className="progress-subtitle">Track your fitness journey with detailed insights</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <Row className="stats-row">
          <Col md={3}>
            <div className="stat-card workout-stat">
              <div className="stat-icon">
                <FaDumbbell />
              </div>
              <div className="stat-content">
                <h3>{workoutStats.total}</h3>
                <p>Workouts Logged</p>
                <div className="stat-detail">
                  {workoutStats.total > 0 ? 'Keep it up!' : 'Start logging!'}
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card volume-stat">
              <div className="stat-icon">
                <FaWeight />
              </div>
              <div className="stat-content">
                <h3>{(workoutStats.totalVolume / 1000).toFixed(1)}T</h3>
                <p>Total Volume</p>
                <div className="stat-detail">
                  {workoutStats.avgVolume > 0 ? `${workoutStats.avgVolume.toFixed(0)}kg avg` : 'Start logging!'}
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card diet-stat">
              <div className="stat-icon">
                <FaAppleAlt />
              </div>
              <div className="stat-content">
                <h3>{dietStats.total}</h3>
                <p>Meals Logged</p>
                <div className="stat-detail">
                  {dietStats.total > 0 ? 'Track daily' : 'Log meals'}
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-card nutrition-stat">
              <div className="stat-icon">
                <FaFire />
              </div>
              <div className="stat-content">
                <h3>{dietStats.avgCalories.toFixed(0)}</h3>
                <p>Avg Calories</p>
                <div className="stat-detail">
                  {dietStats.avgProtein > 0 ? `${dietStats.avgProtein.toFixed(1)}g protein` : 'Log meals'}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="section-header">
            <h2 className="section-title">Performance Analytics</h2>
            <p className="section-subtitle">Visualize your fitness progress over time</p>
          </div>

          {workouts.length === 0 && diets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaChartLine />
              </div>
              <h4>No Data Available</h4>
              <p>Start logging workouts and meals to see your progress</p>
            </div>
          ) : (
            <>
              <Row className="g-4">
                <Col lg={6}>
                  <div className="chart-card">
                    <div className="chart-header">
                      <h3 className="chart-title">
                        <FaDumbbell className="me-2" />
                        Workout Progress
                      </h3>
                      <div className="chart-subtitle">
                        Volume (kg) over last 7 workouts
                      </div>
                    </div>
                    <div className="chart-container">
                      {renderWorkoutChart()}
                    </div>
                    <div className="chart-footer">
                      <div className="chart-stats">
                        <div className="stat-item">
                          <span className="stat-label">Recent Volume:</span>
                          <span className="stat-value">
                            {workoutStats.recentWorkouts.length > 0 ? 
                              workoutStats.recentWorkouts
                                .reduce((sum, w) => sum + ((w.weight || 0) * (w.sets || 0) * (w.reps || 0)), 0)
                                .toFixed(0) + 'kg' : 
                              'N/A'
                            }
                          </span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Last 7 Days:</span>
                          <span className="stat-value">
                            {workouts.slice(-7).length} workouts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="chart-card">
                    <div className="chart-header">
                      <h3 className="chart-title">
                        <FaAppleAlt className="me-2" />
                        Nutrition Progress
                      </h3>
                      <div className="chart-subtitle">
                        Calories & Protein over last 7 meals
                      </div>
                    </div>
                    <div className="chart-container">
                      {renderDietChart()}
                    </div>
                    <div className="chart-footer">
                      <div className="chart-stats">
                        <div className="stat-item">
                          <span className="stat-label">Avg Daily Calories:</span>
                          <span className="stat-value">
                            {dietStats.avgCalories.toFixed(0)}
                          </span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Avg Daily Protein:</span>
                          <span className="stat-value">
                            {dietStats.avgProtein.toFixed(1)}g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Summary Cards */}
              <Row className="g-4 mt-4">
                <Col md={6}>
                  <div className="summary-card">
                    <div className="summary-header">
                      <FaTrophy className="summary-icon" />
                      <h4>Workout Summary</h4>
                    </div>
                    <div className="summary-content">
                      <div className="summary-item">
                        <span className="summary-label">Total Workouts:</span>
                        <span className="summary-value">{workoutStats.total}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Total Volume:</span>
                        <span className="summary-value">{(workoutStats.totalVolume / 1000).toFixed(1)} tons</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Average Volume:</span>
                        <span className="summary-value">{workoutStats.avgVolume.toFixed(0)}kg</span>
                      </div>
                      {workoutStats.recentWorkouts.length > 0 && (
                        <div className="summary-item">
                          <span className="summary-label">Recent Exercises:</span>
                          <div className="recent-exercises">
                            {workoutStats.recentWorkouts.slice(0, 3).map((w, i) => (
                              <span key={i} className="exercise-tag">
                                {w.exercise || `Workout ${i + 1}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="summary-card">
                    <div className="summary-header">
                      <FaFire className="summary-icon" />
                      <h4>Nutrition Summary</h4>
                    </div>
                    <div className="summary-content">
                      <div className="summary-item">
                        <span className="summary-label">Total Meals:</span>
                        <span className="summary-value">{dietStats.total}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Avg Calories:</span>
                        <span className="summary-value">{dietStats.avgCalories.toFixed(0)}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Avg Protein:</span>
                        <span className="summary-value">{dietStats.avgProtein.toFixed(1)}g</span>
                      </div>
                      {dietStats.recentMeals.length > 0 && (
                        <div className="summary-item">
                          <span className="summary-label">Recent Meals:</span>
                          <div className="recent-meals">
                            {dietStats.recentMeals.slice(0, 3).map((m, i) => (
                              <span key={i} className="meal-tag">
                                {m.meal || `Meal ${i + 1}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Progress;