import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts, removeWorkout } from '../redux/actions/workoutActions';
import { 
  FaTrashAlt, 
  FaDumbbell, 
  FaCalendarAlt, 
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
  FaSearch,
  FaSyncAlt,
  FaHistory
} from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import './WorkoutHistory.css';

const WorkoutHistory = () => {
  const dispatch = useDispatch();
  
  const workoutsFromRedux = useSelector((state) => state.workouts.workoutList || []);
  const error = useSelector((state) => state.workouts.error);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchWorkouts()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  // Get unique exercises for filter
  const uniqueExercises = [...new Set(workoutsFromRedux.map(w => w.exercise))].sort();

  // Handle delete workout
  const handleDeleteClick = (id) => {
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

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort workouts
  const sortedWorkouts = [...workoutsFromRedux].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter workouts
  const filteredWorkouts = sortedWorkouts.filter(workout => {
    const matchesSearch = workout.exercise.toLowerCase().includes(filterText.toLowerCase()) ||
                         (workout.date && new Date(workout.date).toLocaleDateString().toLowerCase().includes(filterText.toLowerCase()));
    
    const matchesExercise = selectedExercise === 'all' || workout.exercise === selectedExercise;
    
    return matchesSearch && matchesExercise;
  });

  // Calculate totals
  const totals = filteredWorkouts.reduce((acc, workout) => {
    acc.totalWorkouts++;
    acc.totalSets += workout.sets || 0;
    acc.totalReps += workout.reps || 0;
    acc.totalVolume += (workout.weight || 0) * (workout.sets || 0) * (workout.reps || 0);
    return acc;
  }, { totalWorkouts: 0, totalSets: 0, totalReps: 0, totalVolume: 0 });

  if (error) {
    return (
      <div className="workout-history-wrapper">
        <div className="error-state">
          <FaDumbbell className="error-icon" />
          <h3>Error Loading Workouts</h3>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => dispatch(fetchWorkouts())}
          >
            <FaSyncAlt className="me-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-history-wrapper">
      {/* Header Section */}
      <div className="workout-history-header">
        <div className="header-content">
          <div className="header-icon">
            <FaHistory />
          </div>
          <div>
            <h1 className="history-title">Workout History</h1>
            <p className="history-subtitle">Track and manage your complete workout log</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-item">
          <div className="stat-icon">
            <FaDumbbell />
          </div>
          <div className="stat-content">
            <h3>{totals.totalWorkouts}</h3>
            <p>Total Workouts</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaSort />
          </div>
          <div className="stat-content">
            <h3>{totals.totalSets}</h3>
            <p>Total Sets</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaSyncAlt />
          </div>
          <div className="stat-content">
            <h3>{totals.totalReps}</h3>
            <p>Total Reps</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <h3>{(totals.totalVolume / 1000).toFixed(1)}T</h3>
            <p>Total Volume</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search exercises or dates..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="exercise-select"
            >
              <option value="all">All Exercises</option>
              {uniqueExercises.map((exercise, index) => (
                <option key={index} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="refresh-btn"
            onClick={() => dispatch(fetchWorkouts())}
            disabled={isLoading}
          >
            <FaSyncAlt className={`${isLoading ? 'spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Workout Table */}
      <div className="workout-table-container">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading workouts...</p>
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="empty-state">
            <FaDumbbell className="empty-icon" />
            <h3>No Workouts Found</h3>
            <p>{filterText || selectedExercise !== 'all' ? 'Try adjusting your filters' : 'Start logging your first workout!'}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="workout-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('date')} className="sortable">
                    <span>
                      <FaCalendarAlt className="me-1" />
                      Date
                    </span>
                    {sortConfig.key === 'date' && (
                      sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                    )}
                  </th>
                  <th onClick={() => handleSort('exercise')} className="sortable">
                    <span>
                      <FaDumbbell className="me-1" />
                      Exercise
                    </span>
                    {sortConfig.key === 'exercise' && (
                      sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                    )}
                  </th>
                  <th onClick={() => handleSort('sets')} className="sortable">
                    Sets
                    {sortConfig.key === 'sets' && (
                      sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                    )}
                  </th>
                  <th onClick={() => handleSort('reps')} className="sortable">
                    Reps
                    {sortConfig.key === 'reps' && (
                      sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                    )}
                  </th>
                  <th onClick={() => handleSort('weight')} className="sortable">
                    Weight (kg)
                    {sortConfig.key === 'weight' && (
                      sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                    )}
                  </th>
                  <th>Volume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.map((workout, index) => {
                  const volume = (workout.weight || 0) * (workout.sets || 0) * (workout.reps || 0);
                  return (
                    <tr key={workout._id || index} className="workout-row">
                      <td className="date-cell">
                        <div className="date-content">
                          <FaCalendarAlt className="date-icon" />
                          {workout.date ? new Date(workout.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>
                      <td className="exercise-cell">
                        <div className="exercise-content">
                          <FaDumbbell className="exercise-icon" />
                          <span className="exercise-name">{workout.exercise}</span>
                        </div>
                      </td>
                      <td className="sets-cell">
                        <span className="sets-badge">{workout.sets}</span>
                      </td>
                      <td className="reps-cell">
                        <span className="reps-badge">{workout.reps}</span>
                      </td>
                      <td className="weight-cell">
                        <span className="weight-value">{workout.weight}kg</span>
                      </td>
                      <td className="volume-cell">
                        <div className="volume-display">
                          <span className="volume-value">{volume.toFixed(1)}kg</span>
                          <div className="volume-bar" style={{ width: `${Math.min(100, (volume / 1000) * 100)}%` }}></div>
                        </div>
                      </td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleDeleteClick(workout._id)}
                          className="delete-btn"
                          title="Delete workout"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="summary-cell">
                    <strong>Totals:</strong>
                  </td>
                  <td className="summary-cell">
                    <strong>{totals.totalSets}</strong>
                  </td>
                  <td className="summary-cell">
                    <strong>{totals.totalReps}</strong>
                  </td>
                  <td className="summary-cell">
                    <strong>—</strong>
                  </td>
                  <td className="summary-cell">
                    <strong>{(totals.totalVolume / 1000).toFixed(1)}T</strong>
                  </td>
                  <td className="summary-cell">
                    <strong>Volume</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        
        {filteredWorkouts.length > 0 && (
          <div className="table-footer">
            <div className="pagination-info">
              Showing <strong>{filteredWorkouts.length}</strong> of <strong>{workoutsFromRedux.length}</strong> workouts
            </div>
            <div className="export-options">
              <button className="export-btn">Export CSV</button>
              <button className="export-btn">Print</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this workout? This action cannot be undone."
        title="Delete Workout"
      />
    </div>
  );
};

export default WorkoutHistory;