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
  editProfileRequestStatus: {
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
    editProfile: (state) => {
      state.editProfileRequestStatus = {
        success: false,
        loading: true,
        error: false,
      };
    },
    editProfileSuccess: (state) => {
      state.editProfileRequestStatus = {
        success: true,
        loading: false,
        error: false,
      };
    },
    editProfileFailure: (state, action) => {
      state.editProfileRequestStatus = {
        success: false,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  editProfile,
  editProfileSuccess,
  editProfileFailure,
} = sessionSlice.actions;

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

export const editProfileRequest = (body) => {
  return async (dispatch) => {
    dispatch(editProfile(body));
    services
      .editProfile(body)
      .then((response) => {
        dispatch(editProfileSuccess(response));
      })
      .catch((error) => {
        dispatch(editProfileFailure(error));
      });
  };
};
