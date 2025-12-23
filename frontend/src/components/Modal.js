import React from 'react';
import './Modal.css';

const Modal = ({ show, closeModal, confirmDelete }) => {
  return show ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this workout?</p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={confirmDelete}>
            Yes, Delete
          </button>
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
