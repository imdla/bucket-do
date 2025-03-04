import { createSlice } from '@reduxjs/toolkit';

// 초기값 (localStorage에서 해당 정보 받아옴)
const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoggedIn: !!localStorage.getItem('accessToken'),
  user: {
    name: localStorage.getItem('userName'),
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user.name = action.payload.username;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('userName', action.payload.username);
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user.name = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
    },
    updateTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;

      localStorage.setItem('accessToken', action.payload.accessToken);
    },
  },
});

export const { login, logout, updateTokens } = authSlice.actions;
export default authSlice.reducer;