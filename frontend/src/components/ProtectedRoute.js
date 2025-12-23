import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication status
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkToken = () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      // Simulate token expiration check (example only)
      if (token) {
        const currentTime = Date.now() / 1000; // Current time in seconds
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token payload

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('userInfo'); // Remove invalid token
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Loading is complete
    };

    checkToken();
  }, []);

  // Show a loading spinner or blank page while checking token
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
