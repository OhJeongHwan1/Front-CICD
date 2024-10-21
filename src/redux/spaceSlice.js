import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaceList: [],
  space: {
    spaceId: 0,
    spaceName: "",
    description: "",
    members: [],
  },
  //
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {},
});

export const {} = spaceSlice.actions;

export const selectSpace = (state) => state.space;

export default spaceSlice.reducer;
