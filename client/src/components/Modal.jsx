import React from 'react';
import styles from '../styles/Modal.module.css';

export default Modal = ({ isOpen, onClose, content, confirmText, cancleText, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div>
        <p>{content}</p>

        <div>
          <button onClick={onClose}>{cancleText || '취소'}</button>
          {onConfirm && <button onClick={onConfirm}>{confirmText || '취소'}</button>}
        </div>
      </div>
    </div>
  );
};
