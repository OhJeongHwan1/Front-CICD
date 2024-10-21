import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followList: [],
  //
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
});

export const {} = followSlice.actions;

export const selectFollow = (state) => state.follow;

export default followSlice.reducer;
