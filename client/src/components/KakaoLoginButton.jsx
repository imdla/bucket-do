import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import axios from 'axios';

const REST_API_KEY = '43cf887f1f162e4f54a7974046b2f325';
const REDIRECT_URI = 'http://localhost:5173/redirect'; // 로그인 후 리디렉션되는 URI

const KakaoLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // 이미 카카오 로그인 토큰이 있다면 바로 처리
    const accessToken = localStorage.getItem('kakao_access_token');
    if (accessToken) {
      navigate('/');
    } else {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    }
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
};

export default KakaoLoginButton;
