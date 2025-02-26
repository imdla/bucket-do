import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../store/slices/authSlice';
import styles from '../styles/Header.module.css';

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
            <Link to={'/'}>
              <img src="../public/images/BD-logo.png" alt="logo" />
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
