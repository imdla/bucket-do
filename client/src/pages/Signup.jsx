import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';
function Signup() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  // id 유효성 검사
  const idCheck = () => {
    // if(emailValue === DB에 있는 email 데이터){
    //   alert("이미 존재하는 이메일입니다")
    // }else{
    //   alert("이메일 중복확인 완료!")
    // }
  };

  // email 유효성 검사
  const emailCheck = () => {
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
      password === passwordCheck ? '비밀번호가 일치합니다!' : '비밀번호가 일치하지 않습니다!';
  }

  const confirm = (e) => {
    e.priventDefault;
    if (password != passwordCheck) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
  };
  return (
    <div className={styles.signupBackGround}>
      <div className={styles.signupContainer}>
        <form className={styles.signupForm}>
          <div className={styles.DuplicateCheckBox}>
            <input
              className={styles.signupInput}
              type="text"
              name="id"
              value={id}
              placeholder="아이디"
              required
              onChange={(e) => setId(e.target.value)}
            />
            <button className={styles.emailCheckButton} onClick={emailCheck}>
              중복 확인
            </button>
          </div>
          <div className={styles.DuplicateCheckBox}>
            <input
              className={styles.signupInput}
              type="email"
              name="email"
              value={email}
              placeholder="이메일"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* DB 에 존재하는지 정보 받기 */}
            <button className={styles.emailCheckButton} onClick={emailCheck}>
              중복 확인
            </button>
          </div>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className={styles.signupInput}
            type="text"
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
          <button className={styles.signupButton} onClick={(e) => confirm(e)} type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
