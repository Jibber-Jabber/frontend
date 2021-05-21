import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../session/sessionSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import mainSlice from "../main/mainSlice";

const reducers = combineReducers({
  main: mainSlice,
  session: sessionReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
