import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postingList: [],
  postingDetail: {
    postingId: 0,
    title: "",
    travelDate: "",
    spot: "",
    mainImg: "",
    content: "",
    nickname: "",
    createdAt: "",
    updatedAt: "",
  },
  //
};

export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {},
});

export const {} = postingSlice.actions;

export const selectPosting = (state) => state.posting;

export default postingSlice.reducer;
