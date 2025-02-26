import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authApi from '../api/authApi';
import { login } from '../store/slices/authSlice';
import styles from '../styles/Login.module.css';
import errorMessages from '../cofig/errorMessages';

import Modal from '../components/Modal';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancleText: '확인',
    onConfirm: false,
  });

  // form 입력값 변경
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입
  const handleSignup = () => {
    navigate('/signup');
  };

  // 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await authApi.login(formData);
      const username = formData.username;
      const { token } = response.data;
      dispatch(login({ token, username }));
      navigate('/');
    } catch (error) {
      // todo : 잘못된 비밀번호 입력 시 500 에러 대응 필요
      console.log(error);
      console.log(error.code);

      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;

      setModalData({
        ...modalData,
        content: errorMessage,
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <div>로딩중</div>;
  }

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
