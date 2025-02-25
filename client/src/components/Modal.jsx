import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ isOpen, onClose, content, confirmText, cancleText, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div>
        <p>{content}</p>

        <div>
          <button onClick={onClose}>{cancleText || '취소'}</button>
          {onConfirm && <button onClick={onConfirm}>{confirmText || '확인'}</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
