import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedScheduleId: 0,
  //
};

export const scheduleSlice = createSlice({
  name: "modal",
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
