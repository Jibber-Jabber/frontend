import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: undefined,
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUserInfo } = sessionSlice.actions;

export const sessionSelector = (state) => state.session;

export default sessionSlice.reducer;
