import React, { useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UserProfileDropdown.css';

const UserProfileDropdown = () => {
  const [show, setShow] = useState(false);
  
  // Sample user data (replace with actual user data from your state/context)
  const user = {
    name: "Raj",
    email: "Raj@gmail.com",
    avatar: null, // You can add profile image URL here
    role: "Premium Member"
  };

  return (
    <Dropdown 
      show={show} 
      onToggle={(isOpen) => setShow(isOpen)}
      className="user-profile-dropdown"
    >
      <Dropdown.Toggle variant="transparent" className="user-toggle">
        <div className="user-avatar">
          {user.avatar ? (
            <Image 
              src={user.avatar} 
              roundedCircle 
              className="avatar-image"
              alt={user.name}
            />
          ) : (
            <div className="avatar-placeholder">
              <i className="fas fa-user"></i>
            </div>
          )}
          <div className="user-badge">
            <i className="fas fa-crown"></i>
          </div>
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
        <i className="fas fa-chevron-down dropdown-arrow"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="user-dropdown-menu">
        <div className="dropdown-header">
          <div className="dropdown-avatar">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                roundedCircle 
                className="dropdown-avatar-image"
                alt={user.name}
              />
            ) : (
              <div className="dropdown-avatar-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <div className="dropdown-user-info">
            <h6 className="dropdown-user-name">{user.name}</h6>
            <p className="dropdown-user-email">{user.email}</p>
            <span className="user-role-badge">
              <i className="fas fa-star me-1"></i>
              {user.role}
            </span>
          </div>
        </div>

        <Dropdown.Divider className="dropdown-divider" />

        <Dropdown.Item as={Link} to="/profile" className="dropdown-item">
          <i className="fas fa-user-circle me-2"></i>
          My Profile
        </Dropdown.Item>
        
        <Dropdown.Item as={Link} to="/settings" className="dropdown-item">
          <i className="fas fa-cog me-2"></i>
          Settings
        </Dropdown.Item>
        
        <Dropdown.Item as={Link} to="/subscription" className="dropdown-item">
          <i className="fas fa-crown me-2"></i>
          Upgrade Plan
        </Dropdown.Item>
        
        <Dropdown.Item as={Link} to="/achievements" className="dropdown-item">
          <i className="fas fa-trophy me-2"></i>
          Achievements
        </Dropdown.Item>

        <Dropdown.Divider className="dropdown-divider" />

        <Dropdown.Item as={Link} to="/logout" className="dropdown-item logout-item">
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileDropdown;