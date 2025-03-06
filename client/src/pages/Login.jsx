import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authApi from '../api/authApi';
import { login } from '../store/slices/authSlice';
import styles from '../styles/pages/Login.module.css';

import Modal from '../components/Modal';
import errorMessages from '../config/errorMessages';

import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import KakaoLoginButton from '../components/KakaoLoginButton';
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancelText: '확인',
    onConfirm: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('kakao_access_token');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  // 로딩 1초 이상일 때 스켈레톤 표시
  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => setShowSkeleton(true), 100); // ⬅️ 1초 후에 스켈레톤 표시
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // form 입력값 변경
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입
  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  // 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await authApi.login(formData);
      const username = formData.username;
      const accessToken = response.data.accesstoken;
      const refreshToken = response.data.refreshtoken;
      dispatch(login({ accessToken, refreshToken, username }));
      navigate('/');
    } catch (error) {
      console.log(error);
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

  return (
    <div className={styles.container}>
      {showSkeleton ? ( // ⬅️ showSkeleton
        <>
          <Skeleton width="50vw" height={242} />
          <Skeleton className={styles.skeletonMargin} width="50vw" height={55} />
          <Skeleton className={styles.skeletonMargin} width="50vw" height={55} />

          <div
            className={styles.skeletonMargin}
            style={{ width: '50vw', minWidth: '300px', display: 'flex', gap: '2vw' }}
          >
            <Skeleton width="24vw" height={47} />
            <Skeleton width="24vw" height={47} />
          </div>
        </>
      ) : (
        <div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalData} />

          <>
            <div className={styles.intro}>
              <Link to={'/'}>
                <img className={styles.logo} src="/assets/BD-logo.png" alt="logo" />
              </Link>

              <div className={styles.introText}>
                <p>버킷두(BucketDo)는 작심삼일러를 위한</p>
                <p>작은 실천으로 큰 목표를 이루는 기록 서비스 입니다.</p>
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
      )}

      {/* todo: 소셜 로그인 (카카오, 구글) ! */}
      <div>
        <KakaoLoginButton />
      </div>
    </div>
  );
}
