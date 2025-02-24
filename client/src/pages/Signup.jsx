import React, { useEffect, useState } from 'react';
import styles from '../styles/Signup.module.css';
import authApi from '../api/authApi';
function Signup() {
  // 전체 form데이터를 받는 useState
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
  });

  // 비밀번호 체크용 useState
  const [passwordCheck, setPasswordCheck] = useState('');

  // 모든 input에 값입력시 name값을 value로 지정
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 버튼 클릭시 authApi를 통해 create동작
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }
    try {
      const response = await authApi.signup(formData);
      console.log('회원가입 성공:', response.data);
      console.log(formData);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  // id 유효성 검사
  const handleCheckId = () => {
    // if(emailValue === DB에 있는 email 데이터){
    //   alert("이미 존재하는 이메일입니다")
    // }else{
    //   alert("이메일 중복확인 완료!")
    // }
  };

  // 비밀번호 확인 메시지 설정
  let passwordMessage = '';
  if (passwordCheck) {
    passwordMessage =
      formData.password === passwordCheck
        ? '비밀번호가 일치합니다!'
        : '비밀번호가 일치하지 않습니다!';
  }

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <form className={styles.signupForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.DuplicateCheckBox}>
            <input
              className={styles.signupInput}
              type="text"
              name="username"
              value={formData.username}
              placeholder="아이디"
              required
              onChange={handleChange}
            />
            <button className={styles.emailCheckButton} onClick={handleCheckId}>
              중복 확인
            </button>
          </div>
          <div className={styles.DuplicateCheckBox}>
            <input
              className={styles.signupInput}
              type="email"
              name="email"
              value={formData.email}
              placeholder="이메일"
              required
              onChange={handleChange}
            />
            {/* DB 에 존재하는지 정보 받기 */}
            <button className={styles.emailCheckButton}>중복 확인</button>
          </div>

          <input
            className={styles.signupInput}
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            pattern="[0-9]{2,3}[0-9]{3,4}[0-9]{4}"
            placeholder="연락처 예:01012345678"
            required
            onChange={handleChange}
          />
          <input
            className={styles.signupInput}
            type="password"
            name="password"
            placeholder="비밀번호: 8자 이상, 영문, 숫자, 특수문자를 포함"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className={styles.signupInput}
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
          <input
            className={styles.passwordConfirmed}
            type="text"
            name="passwordConfirmed"
            placeholder={passwordMessage} // 상태에 따라 메시지 변경
            value={passwordMessage}
            disabled
          />
          <button className={styles.signupButton}>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
