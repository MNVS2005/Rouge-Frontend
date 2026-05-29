import React from 'react';
function Modal({ message, type, onClose }) {
  if (!message) return null;

  const icons = {
    error:   "X",
    warning: "!!",
    success: "✓",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <span className="modal-icon">{icons[type] || "!!"}</span>
        <p className="modal-message">{message}</p>
        <button className="modal-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
export default Modal;