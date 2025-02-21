import React from 'react';
import styles from '../styles/Login.module.css';

function Login(setisLogin) {
  return (
    <div className={styles.loginBackGround}>
      <div className={styles.loginContainer}>
        <div className={styles.loginIntro}>
          <div>
            <img src="/images/BD-logo.png" alt="logo" />
          </div>
          <div>
            <p>버킷두(BucketDo)는 작심삼일러를 위한</p>
            <p>작은 실천으로 큰 목표를 이루는 계획 서비스 입니다.</p>
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
          <button className={styles.loginButton} onClick={() => (setisLogin = true)}>
            로그인
          </button>
          {console.log(setisLogin)}
          <button className={styles.signupButton}>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
