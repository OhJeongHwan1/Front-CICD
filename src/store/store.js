import { configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import userSlice from "../redux/userSlice";
import followSlice from "../redux/followSlice";
import postingSlice from "../redux/postingSlice";
import spaceSlice from "../redux/spaceSlice";
import costSlice from "../redux/costSlice";
import modalSlice from "../redux/modalSlice";
import scheduleSlice from "../redux/scheduleSlice";

const reducers = combineReducers({
  user: userSlice,
  follow: followSlice,
  posting: postingSlice,
  space: spaceSlice,
  cost: costSlice,
  modal: modalSlice,
  schedule: scheduleSlice,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
