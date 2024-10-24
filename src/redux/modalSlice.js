import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationModal: false,
  scheduleModal: false,
  scheduleAddModal: false,
  spaceEditModal: false,
  memberInviteModal: false,
  //
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLocationModal: (state, action) => {
      state.locationModal = action.payload;
    },
    setScheduleModal: (state, action) => {
      state.scheduleModal = action.payload;
    },
    setScheduleAddModal: (state, action) => {
      state.scheduleAddModal = action.payload;
    },
    setSpaceEditModal: (state, action) => {
      state.spaceEditModal = action.payload;
    },
    setMemberInviteModal: (state, action) => {
      state.memberInviteModal = action.payload;
    },
  },
});

export const {
  setLocationModal,
  setScheduleModal,
  setScheduleAddModal,
  setSpaceEditModal,
  setMemberInviteModal,
} = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
