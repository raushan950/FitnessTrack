import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProgress, viewProgress, removeProgress } from '../redux/actions/transformationActions';
import { 
  FaUpload, 
  FaRuler, 
  FaWeight, 
  FaTrashAlt,
  FaChartLine,
  FaCalendarAlt,
  FaCamera,
  FaUserCheck,
  FaTrophy
} from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import './Transformation.css';

const Transformation = () => {
  const dispatch = useDispatch();
  const progressData = useSelector((state) => state.progress.progressList);

  const [weight, setWeight] = useState('');
  const [biceps, setBiceps] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [progressId, setProgressId] = useState('');

  useEffect(() => {
    dispatch(viewProgress());
  }, [dispatch]);

  // Calculate statistics
  const calculateStats = () => {
    if (progressData.length === 0) return null;
    
    const weights = progressData.map(p => p.weight).filter(w => w);
    const biceps = progressData.map(p => p.biceps).filter(b => b);
    const chests = progressData.map(p => p.chest).filter(c => c);
    const waists = progressData.map(p => p.waist).filter(w => w);
    
    return {
      startWeight: weights[0],
      currentWeight: weights[weights.length - 1],
      weightChange: weights.length > 1 ? weights[weights.length - 1] - weights[0] : 0,
      avgBiceps: biceps.length ? (biceps.reduce((a, b) => a + b, 0) / biceps.length).toFixed(1) : 0,
      avgChest: chests.length ? (chests.reduce((a, b) => a + b, 0) / chests.length).toFixed(1) : 0,
      avgWaist: waists.length ? (waists.reduce((a, b) => a + b, 0) / waists.length).toFixed(1) : 0,
      totalEntries: progressData.length
    };
  };

  const stats = calculateStats();

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleAddProgress = (e) => {
    e.preventDefault();
    if (!weight || !date || !image) {
      alert('Please provide all required fields!');
      return;
    }

    const newProgress = { 
      weight: parseFloat(weight), 
      biceps: parseFloat(biceps) || 0, 
      chest: parseFloat(chest) || 0, 
      waist: parseFloat(waist) || 0, 
      date, 
      image 
    };

    dispatch(addProgress(newProgress));
    setWeight('');
    setBiceps('');
    setChest('');
    setWaist('');
    setDate('');
    setImage(null);
    setImagePreview(null);
    if (document.getElementById("fileInput")) {
      document.getElementById("fileInput").value = null;
    }
  };

  const handleDeleteClick = (id) => {
    setProgressId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeProgress(progressId));
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="transformation-wrapper">
      <Container fluid="xxl" className="transformation-container">
        {/* Header Section */}
        <div className="transformation-header">
          <div className="header-content">
            <div className="header-icon">
              <FaChartLine />
            </div>
            <div>
              <h1 className="transformation-title">Progress Tracker</h1>
              <p className="transformation-subtitle">Track your transformation journey with photos and measurements</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <Row className="stats-row">
            <Col md={3}>
              <div className="stat-card weight-stat">
                <div className="stat-icon">
                  <FaWeight />
                </div>
                <div className="stat-content">
                  <h3>{stats.currentWeight}kg</h3>
                  <p>Current Weight</p>
                  <div className="stat-change">
                    {stats.weightChange !== 0 && (
                      <span className={stats.weightChange > 0 ? 'positive' : 'negative'}>
                        {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)}kg
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card measurement-stat">
                <div className="stat-icon">
                  <FaRuler />
                </div>
                <div className="stat-content">
                  <h3>{stats.totalEntries}</h3>
                  <p>Progress Entries</p>
                  <div className="stat-trend">Keep going! 💪</div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card muscle-stat">
                <div className="stat-icon">
                  <FaUserCheck />
                </div>
                <div className="stat-content">
                  <h3>{stats.avgChest}cm</h3>
                  <p>Avg Chest</p>
                  <div className="stat-detail">Build strength</div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card achievement-stat">
                <div className="stat-icon">
                  <FaTrophy />
                </div>
                <div className="stat-content">
                  <h3>{stats.avgWaist}cm</h3>
                  <p>Avg Waist</p>
                  <div className="stat-detail">Stay lean</div>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Add Progress Form */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Log New Progress</h2>
            <p className="section-subtitle">Document your transformation journey</p>
          </div>

          <Form onSubmit={handleAddProgress} className="progress-form">
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaWeight className="me-2" />
                    Weight (kg)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.1"
                    value={weight}
                    placeholder="e.g., 75.5"
                    onChange={(e) => setWeight(e.target.value)}
                    className="form-control-custom"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaRuler className="me-2" />
                    Biceps (cm)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.1"
                    value={biceps}
                    placeholder="Biceps size"
                    onChange={(e) => setBiceps(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaRuler className="me-2" />
                    Chest (cm)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.1"
                    value={chest}
                    placeholder="Chest size"
                    onChange={(e) => setChest(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaRuler className="me-2" />
                    Waist (cm)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.1"
                    value={waist}
                    placeholder="Waist size"
                    onChange={(e) => setWaist(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-3">
              <Col md={6}>
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
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">
                    <FaCamera className="me-2" />
                    Progress Photo
                  </Form.Label>
                  <div className="file-upload-wrapper">
                    <Form.Control
                      type="file"
                      id="fileInput"
                      onChange={handleImageUpload}
                      className="form-control-custom file-input"
                      accept="image/*"
                      required
                    />
                    <label htmlFor="fileInput" className="file-upload-label">
                      <FaUpload className="me-2" />
                      Choose Photo
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="image-preview mt-3">
                      <div className="preview-label">Preview:</div>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="preview-image"
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button 
              type="submit" 
              className="submit-btn mt-4"
              disabled={!weight || !date || !image}
            >
              <FaChartLine className="me-2" />
              Log Progress Entry
            </Button>
          </Form>
        </div>

        {/* Progress Entries */}
        <div className="progress-entries-section">
          <div className="section-header">
            <h2 className="section-title">Progress History</h2>
            <p className="section-subtitle">
              {progressData.length === 0 ? 'No progress entries yet' : `Total: ${progressData.length} entries`}
            </p>
          </div>

          {progressData.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaChartLine />
              </div>
              <h4>No Progress Tracked</h4>
              <p>Start by logging your first progress entry above</p>
            </div>
          ) : (
            <Row className="g-4">
              {progressData.map((progress, index) => (
                <Col key={progress._id || index} md={6} lg={4}>
                  <div className="progress-card">
                    <div className="progress-card-header">
                      <div className="progress-date">
                        <FaCalendarAlt className="me-2" />
                        {new Date(progress.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(progress._id)}
                        title="Delete progress entry"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                    <div className="progress-image-container">
                      {progress.image && progress.imageType ? (
                        <img 
                          src={`data:${progress.imageType};base64,${progress.image}`}
                          alt="Progress"
                          className="progress-image"
                        />
                      ) : (
                        <div className="no-image-placeholder">
                          <FaCamera />
                          <span>No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="progress-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <div className="detail-icon">
                            <FaWeight />
                          </div>
                          <div className="detail-content">
                            <span className="detail-value">{progress.weight}kg</span>
                            <span className="detail-label">Weight</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon">
                            <FaRuler />
                          </div>
                          <div className="detail-content">
                            <span className="detail-value">{progress.biceps || '-'}cm</span>
                            <span className="detail-label">Biceps</span>
                          </div>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-item">
                          <div className="detail-icon">
                            <FaRuler />
                          </div>
                          <div className="detail-content">
                            <span className="detail-value">{progress.chest || '-'}cm</span>
                            <span className="detail-label">Chest</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon">
                            <FaRuler />
                          </div>
                          <div className="detail-content">
                            <span className="detail-value">{progress.waist || '-'}cm</span>
                            <span className="detail-label">Waist</span>
                          </div>
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
        message="Are you sure you want to delete this progress entry?"
        title="Delete Progress Entry"
      />
    </div>
  );
};

export default Transformation;