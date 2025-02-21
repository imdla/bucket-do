import React from 'react';
import styles from '../styles/Login.module.css';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const onSignupPage = () => {
    navigate('/signup'); // '/signup' 페이지로 리다이렉션
  };
  const onLogin = () => {
    setIsLogin(true); // 로그인 버튼을 클릭하면 isLogin을 true로 설정
  };

  return (
    <div className={styles.loginBackGround}>
      <div className={styles.loginContainer}>
        <div className={styles.loginIntro}>
          <div>
            <img className={styles.logoImage} src="/images/BD-logo.png" alt="logo" />
          </div>
          <div>
            <p className={styles.introText}>버킷두(BucketDo)는 작심삼일러를 위한</p>
            <p className={styles.introText}>작은 실천으로 큰 목표를 이루는 계획 서비스 입니다.</p>
          </div>
        </div>
        <div>
          <form>
            <input className={styles.emailInput} type="email" name="email" placeholder="이메일" />
            <input
              className={styles.passwordInput}
              type="text"
              name="password"
              placeholder="비밀번호"
            />
          </form>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.loginButton} onClick={onLogin}>
            로그인
          </button>
          <button className={styles.signupButton} onClick={onSignupPage}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
