import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authApi from '../api/authApi';
import { logout } from '../store/slices/authSlice';
import styles from '../styles/components/Header.module.css';

import Modal from './Modal';
import errorMessages from '../config/errorMessages';

function Header() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => dispatch(logout()),
  });

  // 로그아웃 버튼 기능
  function handleClick() {
    setModalData({
      ...modalData,
      content: '로그아웃하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => await authLogout(),
    });
    setIsModalOpen(true);
  }

  // 사용자 로그아웃
  const authLogout = async () => {
    setIsModalOpen(false);

    const response = await authApi.logout();
    if (response.status === 204) {
      dispatch(logout());
    } else {
      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;
      const modalData = {
        content: errorMessage,
        cancelText: '확인',
        onConfirm: false,
      };

      modalOpen(modalData);
    }
  };

  return (
    <header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalData} />

      <div className={styles.container}>
        <>
          <h1 className={styles.logo}>
            <Link to={'/'}>
              <img src="/assets/BD-logo.png" alt="logo" />
            </Link>
          </h1>
        </>

        <>
          <button className={styles.logoutButton} onClick={handleClick}>
            로그아웃
          </button>
        </>
      </div>
    </header>
  );
}

export default Header;
