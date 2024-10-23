import { configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import userSlice from "../redux/userSlice";
import followSlice from "../redux/followSlice";
import postingSlice from "../redux/UserSlice";
import spaceSlice from "../redux/spaceSlice";
import costSlice from "../redux/costSlice";
import modalSlice from "../redux/modalSlice";

const reducers = combineReducers({
  user: userSlice,
  follow: followSlice,
  posting: postingSlice,
  space: spaceSlice,
  cost: costSlice,
  modal: modalSlice,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
