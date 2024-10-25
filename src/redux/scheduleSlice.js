import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

const initialState = {
  selectedScheduleId: 0,
  //
};

export const deleteScheduleAsync = createAsyncThunk(
  "schedule/deleteSchedule",
  async (data) => {
    const response = await api.deleteSchedule(data);
    const { result } = response.data;

    return result;
  }
);

export const addScheduleAsync = createAsyncThunk(
  "schedule/addSchedule",
  async (data) => {
    const response = await api.addSchedule(data);
    const { result } = response.data;

    return response.data;
  }
);

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSelectedScheduleId: (state, action) => {
      state.selectedScheduleId = action.payload;
    },
  },
});

export const { setSelectedScheduleId } = scheduleSlice.actions;

export const selectSchedule = (state) => state.modal;

export default scheduleSlice.reducer;
