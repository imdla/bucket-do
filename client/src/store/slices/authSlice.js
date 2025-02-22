import { createSlice } from "@reduxjs/toolkit";

// 초기값 (localStorage에서 해당 정보 받아옴)
const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
  user: {
    name: localStorage.getItem('userName'),
  },
};