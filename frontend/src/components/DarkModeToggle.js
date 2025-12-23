import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode); // Add or remove 'dark-mode' class on body
  };

  return (
    <Button variant="secondary" onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;
