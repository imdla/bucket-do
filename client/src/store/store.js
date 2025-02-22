import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReduce,
  },
});

export default store;