import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../styles/Login.module.css';

export default function Login({ setIsLogin }) {
  const navigate = useNavigate();

  const handleSignupPage = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className={styles.container}>
      <>
        <div className={styles.loginIntro}>
          <Link to={'/'}>
            <img className={styles.logoImage} src="../public/images/BD-logo.png" alt="logo" />
          </Link>

          <div className={styles.introText}>
            <p>버킷두(BucketDo)는 작심삼일러를 위한</p>
            <p>작은 실천으로 큰 목표를 이루는 계획 서비스 입니다.</p>
          </div>
        </div>
      </>

      <>
        <form className={styles.loginForm}>
          <input type="text" name="text" placeholder="아이디" required />
          <input type="password" name="password" placeholder="비밀번호" required />

          <div className={styles.buttonBox}>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={handleSignupPage}>회원가입</button>
          </div>
        </form>
      </>
    </div>
  );
}
