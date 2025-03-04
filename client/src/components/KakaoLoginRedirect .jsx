import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const REDIRECT_URI = 'http://localhost:5173/redirect'; // 리디렉션되는 URI
const REST_API_KEY = '43cf887f1f162e4f54a7974046b2f325'; // 카카오 REST API 키

const KakaoLoginRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code'); // URL에서 인가 코드를 가져옴

  useEffect(() => {
    if (code) {
      // 카카오 서버에서 토큰을 받는 함수
      const getKakaoToken = async () => {
        try {
          const response = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: REST_API_KEY,
              redirect_uri: REDIRECT_URI,
              code: code,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
          );

          const { access_token } = response.data;
          localStorage.setItem('kakao_access_token', access_token); // 토큰 로컬스토리지에 저장

          console.log(access_token);

          // 사용자 정보 가져오기
          const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          // 사용자 정보를 로컬 스토리지에 저장
          const userInfo = userResponse.data;
          localStorage.setItem('user_info', JSON.stringify(userInfo));
          console.log(userInfo);

          navigate('/');
        } catch (error) {
          console.error('카카오 로그인 토큰 요청 실패:', error);
        }
      };

      getKakaoToken();
    }
  }, [code, navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLoginRedirect;
