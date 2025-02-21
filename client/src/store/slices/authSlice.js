import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
      id: 1,
    },
  ];

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
  },
});

export default authSlice.reducer;
