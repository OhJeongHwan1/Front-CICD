import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nickname: "",
    profile: null,
  },
  //
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
