import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./slices/authSlice";
import bucketReduce from './slices/bucketSlice';

const store = configureStore({
  reducer: {
    auth: authReduce,
    bucket: bucketReduce,
  },
});

export default store;