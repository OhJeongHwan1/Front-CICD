import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
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

export const getPostingListAsync = createAsyncThunk(
  "post/getPostingList",
  async (data) => {
    const response = await api.getPostingList(data);
    const { result } = response.data;

    return response.data;
  }
);

export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {},
});

export const {} = postingSlice.actions;

export const selectPosting = (state) => state.posting;

export default postingSlice.reducer;
