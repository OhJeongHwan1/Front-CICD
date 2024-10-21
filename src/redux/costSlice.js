import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  costList: [],
  //
};

export const costSlice = createSlice({
  name: "cost",
  initialState,
  reducers: {},
});

export const {} = costSlice.actions;

export const selectCost = (state) => state.cost;

export default costSlice.reducer;
