import axios from 'axios';
import store from '../store/store';
import { logout, updateTokens } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      // 토큰 갱신 요청
      try {
        const data = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reissuance`);
        store.dispatch(updateTokens({ accessToken: data.accessToken }));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

        return axios(error.config);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
