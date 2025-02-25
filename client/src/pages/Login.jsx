import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from '../styles/Login.module.css';
import authApi from '../api/authApi';
import { login } from '../store/slices/authSlice';
import Modal from '../components/Modal';

export default function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalData, setModalData] = useState({
    content: '아이디나 비밀번호가 일치하지 않습니다.',
    cancleText: '확인',
    onConfirm: false,
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      const username = formData.username;
      const { token } = response.data;
      dispatch(login({ token, username }));
      navigate('/');

      setIsLogin(true);
    } catch (error) {
      setIsModalOpen(true);
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalData} />

        <>
          <div className={styles.intro}>
            <Link to={'/'}>
              <img className={styles.logo} src="../public/images/BD-logo.png" alt="logo" />
            </Link>

            <div className={styles.introText}>
              <p>버킷두(BucketDo)는 작심삼일러를 위한</p>
              <p>작은 실천으로 큰 목표를 이루는 기록 서비스 입니다</p>
            </div>
          </div>
        </>

        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="아이디"
              required
              onChange={handleFormInput}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              required
              onChange={handleFormInput}
            />

            <div className={styles.buttonBox}>
              <button type="submit">로그인</button>
              <button onClick={handleSignup}>회원가입</button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}
