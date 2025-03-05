import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src="/assets/BD-logo.png" alt="로고" />
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to={'/'}>홈으로 이동</Link>
    </div>
  );
}
