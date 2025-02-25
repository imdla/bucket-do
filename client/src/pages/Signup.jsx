import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authApi from '../api/authApi';
import styles from '../styles/Signup.module.css';

import Modal from '../components/Modal';

function Signup() {
  const navigate = useNavigate();
  const [passwordCheck, setPasswordCheck] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancleText: '확인',
    onConfirm: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== passwordCheck) {
      setModalData({
        ...modalData,
        content: '비밀번호가 일치하지 않습니다.',
      });
      setIsModalOpen(true);
      return;
    }

    try {
      await authApi.signup(formData);
      setModalData({
        ...modalData,
        content: '회원가입이 성공적으로 완료되었습니다.',
      });
      setIsModalOpen(true);
      navigate('/login');
    } catch (error) {
      setModalData({
        ...modalData,
        content: '회원가입이 실패되었습니다.',
      });
      setIsModalOpen(true);

      console.error('회원가입 실패:', error);
    }
  };

  const handleCheckId = async (e) => {
    e.preventDefault();
    const userName = formData.username;
    try {
      const response = await authApi.checkUsername(userName);
      const isPossible = response.available;

      if (isPossible) {
        setModalData({
          ...modalData,
          content: '사용 가능한 아이디입니다.',
        });
        setIsModalOpen(true);
      } else {
        setModalData({
          ...modalData,
          content: '이미 사용 중인 아이디입니다.',
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
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
      <form onSubmit={handleSubmit}>
        <div className={styles.usernameBox}>
          <input
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
          type="email"
          name="email"
          value={formData.email}
          placeholder="이메일"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 : 8자 이상, 영문, 숫자, 특수문자 포함"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
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
          placeholder={passwordMessage}
          value={passwordMessage}
          disabled
        />
        <button className={styles.signupButton}>회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
