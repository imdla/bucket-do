import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../store/slices/authSlice';
import styles from '../styles/Header.module.css';

import Modal from './Modal';

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
    });
    setIsModalOpen(true);
  }

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
