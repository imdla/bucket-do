import React from 'react';
import styles from '../styles/Header.module.css';
import { logout } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(logout());
  }

  return (
    <header>
      <div className={styles.container}>
        <>
          <h1 className={styles.logo}>
            <img src="../public/images/BD-logo.png" alt="logo" />
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
