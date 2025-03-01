import React from 'react';
import styles from '../styles/components/Modal.module.css';

const Modal = ({ isOpen, onClose, content, confirmText, cancelText, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.backGround}></div>
      <div className={styles.container}>
        <div>
          <p>{content}</p>

          <div className={styles.buttonBox}>
            {onConfirm && <button onClick={onConfirm}>{confirmText || '확인'}</button>}
            <button onClick={onClose}>{cancelText || '취소'}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
