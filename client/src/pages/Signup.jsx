import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import authApi from '../api/authApi';
import styles from '../styles/pages/Signup.module.css';
import errorMessages from '../config/errorMessages';

import Modal from '../components/Modal';

import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedUsername, setCheckedUsername] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancelText: '확인',
    onConfirm: false,
  });

  // from 입력값 변경
  const handleChange = (e) => {
    if (e.target.name == 'username') {
      setCheckedUsername(false);
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입
  const handleSubmit = async (e) => {
    e.preventDefault();

    // username 중복 확인 여부
    if (!checkedUsername) {
      setModalData({
        ...modalData,
        content: '아이디 중복 검사가 필요합니다.',
      });
      setIsModalOpen(true);
      return;
    }

    // 이메일 정규식 (일반적인 이메일 형식 검사)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 이메일 조건 일치 여부
    if (!emailRegex.test(formData.email)) {
      setModalData({
        ...modalData,
        content: '이메일 형식에 맞게 입력해주세요.',
      });
      setIsModalOpen(true);
      return;
    }
    // 비밀번호 정규식 (8자 이상, 영문, 숫자, 특수문자 포함)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // 비밀번호 조건 일치 여부
    if (!passwordRegex.test(formData.password)) {
      setModalData({
        ...modalData,
        content: '비밀번호 형식에 맞게 입력해주세요.',
      });
      setIsModalOpen(true);
      return;
    }

    // 비밀번호 일치 여부
    if (formData.password !== passwordCheck) {
      setModalData({
        ...modalData,
        content: '비밀번호가 일치하지 않습니다.',
      });
      setIsModalOpen(true);
      return;
    }
    try {
      setIsLoading(true);

      await authApi.signup(formData);
      setModalData({
        ...modalData,
        content: '회원가입이 성공적으로 완료되었습니다.',
      });
      setIsModalOpen(true);
      navigate('/login');
    } catch (error) {
      const errorMessage =
        errorMessages[error.status]?.[error.code] ||
        errorMessages[error.status]?.DEFAULT ||
        '회원가입이 실패되었습니다.';
      setModalData({
        ...modalData,
        content: errorMessage,
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // username 중복 검사
  const handleCheckId = async (e) => {
    e.preventDefault();
    const userName = formData.username;

    try {
      setIsLoading(true);

      const response = await authApi.checkUsername(userName);
      const isPossible = response.available;
      if (userName === '') {
        setModalData({
          ...modalData,
          content: '아이디를 입력해 주세요.',
        });
        setIsModalOpen(true);
      } else if (isPossible) {
        setCheckedUsername(true);

        setModalData({
          ...modalData,
          content: '사용 가능한 아이디입니다.',
        });
        setIsModalOpen(true);
      } else if (!isPossible) {
        setCheckedUsername(false);

        setModalData({
          ...modalData,
          content: '이미 사용 중인 아이디입니다.',
        });
        setIsModalOpen(true);
      }
    } catch (error) {
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

  let passwordMessage = '';
  if (passwordCheck) {
    passwordMessage =
      formData.password === passwordCheck
        ? '비밀번호가 일치합니다'
        : '비밀번호가 일치하지 않습니다';
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <div style={{ width: '50vw', minWidth: '300px', display: 'flex', gap: '2vw' }}>
            <Skeleton width="60px" height={55} />
          </div>
          <Skeleton className={styles.skeletonMargin} width="50vw" height={55} />
          <Skeleton className={styles.skeletonMargin} width="50vw" height={55} />
          <Skeleton className={styles.skeletonMargin} width="50vw" height={55} />
          <Skeleton className={styles.skeletonMargin} width="50vw" height={55} />
          <Skeleton height={55} />
          <Skeleton className={styles.skeletonMargin} width="111px" height={55} />
        </>
      ) : (
        <>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalData} />

          <nav>
            <h1 className={styles.logo}>
              <Link to={'/'}>
                <img src="/assets/BD-logo.png" alt="logo" />
              </Link>
            </h1>

            <div className={styles.breadcrumb}>
              <Link to={'/'}>홈</Link>
              <p>&#10095;</p>
              <Link to={'/signup'}>회원가입</Link>
            </div>
          </nav>

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
              placeholder="이메일 : test@naver.com"
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
        </>
      )}
    </div>
  );
}

export default Signup;
