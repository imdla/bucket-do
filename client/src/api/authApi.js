import api from "./axios"

const ENDPOINT = '/auth';
const authApi = {
  // 회원가입
  signup: async (formData) => {
    const response = await api.post(`${ENDPOINT}/signup`, formData);
    return response.data;
  },

  // 로그인
  login: async (formData) => {
    const response = await api.post(`${ENDPOINT}/login`, formData);
    return response.data;
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
};

export default authApi;