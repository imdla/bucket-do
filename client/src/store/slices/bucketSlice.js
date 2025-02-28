import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bucketId: null,
};

const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    createBucket: (state, action) => {
      state.bucketId = action.payload.bucketId;
      localStorage.setItem('bucketId', action.payload.bucketId);
    },
    removeBucket: (state, action) => {
      state.bucketId = null;
      localStorage.removeItem('bucketId');
    },
  },
});

export const { createBucket, removeBucket } = bucketSlice.actions;
export default bucketSlice.reducer;