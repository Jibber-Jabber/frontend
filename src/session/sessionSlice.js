import { createSlice } from "@reduxjs/toolkit";
import { services } from "./sessionServices";

const initialState = {
  userInfo: undefined,
  isLoggedIn: false,
  loginRequestStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state) => {
      state.loginRequestStatus = {
        success: false,
        loading: true,
        error: false,
      };
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.loginRequestStatus = {
        success: true,
        loading: false,
        error: false,
      };
    },
    loginFailure: (state, action) => {
      state.loginRequestStatus = {
        success: false,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { login, loginSuccess, loginFailure } = sessionSlice.actions;

export const sessionSelector = (state) => state.session;

export default sessionSlice.reducer;

export const loginRequest = (body) => {
  return async (dispatch) => {
    dispatch(login());
    services
      .login(body)
      .then((response) => {
        dispatch(loginSuccess(response));
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
};
