import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profiles';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import WorkoutList from './pages/WorkoutList';
import Transformation from './pages/Transformation';
import DietPlan from './pages/DietPlan';
import ProgressChart from './components/Progress';
import AppNavbar from './components/Navbar';
import WorkoutHistory from './pages/WorkoutHistory';
import { Container } from 'react-bootstrap';

const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000; // Check if token is valid
  } catch (error) {
    return false; // Invalid token
  }
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const unprotectedRoutes = ['/', '/login', '/signup']; // Define unprotected routes

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    if (token && validateToken(token)) {
      // Redirect from unprotected routes to home if authenticated
      if (unprotectedRoutes.includes(location.pathname)) {
        navigate('/home', { replace: true });
      }
    } else if (!unprotectedRoutes.includes(location.pathname)) {
      // Redirect to login if accessing a protected route without a valid token
      localStorage.removeItem('userInfo'); // Clear invalid token
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute><WorkoutList /></ProtectedRoute>} />
          <Route path="/diet" element={<ProtectedRoute><DietPlan /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressChart /></ProtectedRoute>} />
          <Route path="/workout-history" element={<ProtectedRoute><WorkoutHistory /></ProtectedRoute>} />
          <Route path="/transformation" element={<ProtectedRoute><Transformation /></ProtectedRoute>} />
        </Routes>
      </Container>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
