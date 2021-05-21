import { createSlice } from "@reduxjs/toolkit";
import { services } from "./mainServices";

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
    getPosts: (state) => {
      state.loginRequestStatus = {
        success: false,
        loading: true,
        error: false,
      };
    },
    getPostsSuccess: (state, action) => {
      state.postsList = action.payload;
      state.getPostsRequestStatus = {
        success: true,
        loading: false,
        error: false,
      };
    },
    getPostsFailure: (state, action) => {
      state.getPostsRequestStatus = {
        success: false,
        loading: false,
        error: action.payload,
      };
    },
    createPost: (state) => {
      state.createPostRequestStatus = {
        success: false,
        loading: true,
        error: false,
      };
    },
    createPostSuccess: (state) => {
      state.createPostRequestStatus = {
        success: true,
        loading: false,
        error: false,
      };
    },
    createPostFailure: (state, action) => {
      state.createPostRequestStatus = {
        success: false,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  getPosts,
  getPostsSuccess,
  getPostsFailure,
  createPost,
  createPostSuccess,
  createPostFailure,
} = mainSlice.actions;

export const mainSelector = (state) => state.main;

export default mainSlice.reducer;

export const getPostsRequest = () => {
  return async (dispatch) => {
    dispatch(getPosts());
    services
      .getPosts()
      .then((response) => {
        dispatch(getPostsSuccess(response));
      })
      .catch((error) => {
        dispatch(getPostsFailure(error));
      });
  };
};

export const createPostRequest = (body) => {
  return async (dispatch) => {
    dispatch(createPost());
    services
      .createPost(body)
      .then((response) => {
        dispatch(createPostSuccess(response));
        dispatch(getPostsRequest());
      })
      .catch((error) => {
        dispatch(createPostFailure(error));
      });
  };
};
