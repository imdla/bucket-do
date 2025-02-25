import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
  });
  const [passwordCheck, setPasswordCheck] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalData, setModalData] = useState({
    content: '비밀번호가 일치하지 않습니다.',
    cancleText: '확인',
    onConfirm: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== passwordCheck) {
      setIsModalOpen(true);
      return;
    }

    try {
      await authApi.signup(formData);
      alert('회원가입 성공');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  // username 유효성 검사
  const handleCheckId = () => {
    // if(emailValue === DB에 있는 email 데이터){
    //   alert("이미 존재하는 이메일입니다")
    // }else{
    //   alert("이메일 중복확인 완료!")
    // }
  };

  let passwordMessage = '';
  if (passwordCheck) {
    passwordMessage =
      formData.password === passwordCheck
        ? '비밀번호가 일치합니다'
        : '비밀번호가 일치하지 않습니다';
  }

  return (
    <div className={styles.container}>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalData} />
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.usernameBox}>
          <input
            className={styles.signupInput}
            type="text"
            name="username"
            value={formData.username}
            placeholder="아이디"
            required
            onChange={handleChange}
          />
          <button className={styles.usernameCheckButton} onClick={handleCheckId}>
            중복 확인
          </button>
        </div>

        <input
          className={styles.signupInput}
          type="email"
          name="email"
          value={formData.email}
          placeholder="이메일"
          required
          onChange={handleChange}
        />

        <input
          className={styles.signupInput}
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          pattern="[0-9]{2,3}[0-9]{3,4}[0-9]{4}"
          placeholder="연락처 : 01012345678"
          required
          onChange={handleChange}
        />
        <input
          className={styles.signupInput}
          type="password"
          name="password"
          placeholder="비밀번호 : 8자 이상, 영문, 숫자, 특수문자 포함"
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
  );
}

export default Signup;
