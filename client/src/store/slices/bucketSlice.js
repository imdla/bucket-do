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
      sessionStorage.setItem('bucketId', action.payload.bucketId);
    },
    removeBucket: (state, action) => {
      state.bucketId = null;
      sessionStorage.removeItem('bucketId');
    },
  },
});

export const { createBucket, removeBucket } = bucketSlice.actions;
export default bucketSlice.reducer;