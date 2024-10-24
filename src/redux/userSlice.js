import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: 0,
    nickname: "오정환",
    profile: "/Default Profile.png",
  },
  //
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogOut: (state, action) => {
      state.user = initialState.user;
    },
  },
});

export const { userLogOut } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
