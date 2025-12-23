import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

const ToastComponent = ({ show, setShow, message, variant }) => {
  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body className={`text-${variant}`}>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
