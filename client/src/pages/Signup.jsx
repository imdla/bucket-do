import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';
function Signup() {
  return (
    <div className={styles.signupBackGround}>
      <div className={styles.signupContainer}>
        <form className={styles.signupForm}>
          <div>
            <input
              className={styles.signupInput}
              type="email"
              name="email"
              placeholder="이메일"
              required
            />
            {/* DB 에 존재하는지 정보 받기 */}
            <button className={styles.emailCheckButton}>중복 확인</button>
          </div>
          <input
            className={styles.signupInput}
            type="text"
            name="username"
            placeholder="닉네임"
            required
          />
          <input
            className={styles.signupInput}
            type="tel"
            name="tel"
            pattern="[0-9]{2,3}[0-9]{3,4}[0-9]{4}"
            placeholder="연락처 예:01012345678"
            required
          />
          <input
            className={styles.signupInput}
            type="text"
            name="password"
            placeholder="비밀번호"
            required
          />
          <input
            className={styles.signupInput}
            type="text"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            required
          />
          <input
            className={styles.passwordConfirmed}
            type="text"
            name="passwordConfirmed"
            placeholder="비밀번호가 확인되었습니다"
            disabled
          />
          <button className={styles.signupButton}>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
