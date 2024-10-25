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
  selectedPostingId: 0,
  //
};

export const getPostingListAsync = createAsyncThunk(
  "posting/getPostingList",
  async (data) => {
    const response = await api.getPostingList(data);
    const { result } = response.data;

    return response.data;
  }
);

export const getPostingDetailAsync = createAsyncThunk(
  "posting/getPostingDetail",
  async (data) => {
    const response = await api.getPostingDetail(data);

    return response.data;
  }
);

export const addPostingAsync = createAsyncThunk(
  "posting/addPosting",
  async (data) => {
    const response = await api.addPosting(data);

    return response.data;
  }
);

export const deletePostingAsync = createAsyncThunk(
  "posting/deletePosting",
  async (data) => {
    const response = await api.deletePosting(data);

    return response.data;
  }
);

export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    setSelectedPostingId: (state, action) => {
      state.selectedPostingId = action.payload;
    },
  },
});

export const { setSelectedPostingId } = postingSlice.actions;

export const selectPosting = (state) => state.posting;

export default postingSlice.reducer;
