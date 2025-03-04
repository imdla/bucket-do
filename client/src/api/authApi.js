import api from './axios';

const ENDPOINT = '/auth';
const authApi = {
  // 회원가입
  signup: async (formData) => {
    const response = await api.post(`${ENDPOINT}/signup`, formData);
    return response.data;
  },

  // 로그인
  login: async (formData) => {
    const response = await api.post(`${ENDPOINT}/login`, formData, {
      credentials: 'include',
    });
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await api.post(`${ENDPOINT}/logout`, {
      credentials: 'include',
    });
    return response;
  },

  // 인증
  verify: async () => {
    const response = await api.get(`${ENDPOINT}/verify`);
    return response;
  },

  // username 유효성 검사
  checkUsername: async (userName) => {
    const response = await api.get(`${ENDPOINT}/users?username=${userName}`);
    return response.data;
  },

  // 토큰 갱신 요청
  refreshAccessToken: async () => {
    const response = await api.post(`${ENDPOINT}/reissuance`, {
      credentials: 'include',
    });
    return response;
  },
};

export default authApi;
