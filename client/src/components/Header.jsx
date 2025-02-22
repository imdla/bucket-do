import React from 'react';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <>
          <h1 className={styles.logo}>
            <img src="../public/images/BD-logo.png" alt="logo" />
          </h1>
        </>

        <>
          <button className={styles.logoutButton}>로그아웃</button>
        </>
      </div>
    </header>
  );
}

export default Header;
