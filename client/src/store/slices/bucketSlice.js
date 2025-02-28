import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenId: null,
};

const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    createBucket: (state, action) => {
      state.tokenId = action.payload.tokenId;
      localStorage.setItem('tokenId', action.payload.token);
    },
    removeBucket: (state, action) => {
      state.tokenId = null;
      localStorage.removeItem('tokenId');
    },
  },
});

export const { createBucket, removeBucket } = bucketSlice.actions;
export default bucketSlice.reducer;