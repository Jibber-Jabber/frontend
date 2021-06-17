import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsList: [],
  getPostsRequestStatus: {
    loading: false,
    success: false,
    error: false,
  },
  createPostRequestStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setPostsList: (state, action) => {
      state.postsList = action.payload;
    },
  },
});

export const { setPostsList } = mainSlice.actions;

export const mainSelector = (state) => state.main;

export default mainSlice.reducer;
