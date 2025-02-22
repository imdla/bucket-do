import { createSlice } from "@reduxjs/toolkit";

// 초기값 (localStorage에서 해당 정보 받아옴)
const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
  user: {
    name: localStorage.getItem('userName'),
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user.name = action.payload.username;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userName', action.payload.username);
    },
  },
});