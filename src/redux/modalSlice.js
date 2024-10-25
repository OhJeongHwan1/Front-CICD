import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationModal: false,
  locationModal2: false,
  scheduleModal: false,
  scheduleAddModal: false,
  spaceEditModal: false,
  memberInviteModal: false,
  dateEditModal: false,
  //
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLocationModal: (state, action) => {
      state.locationModal = action.payload;
    },
    setLocationModal2: (state, action) => {
      state.locationModal2 = action.payload;
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
    setDateEditModal: (state, action) => {
      state.dateEditModal = action.payload;
    },
  },
});

export const {
  setLocationModal,
  setLocationModal2,
  setScheduleModal,
  setScheduleAddModal,
  setSpaceEditModal,
  setMemberInviteModal,
  setDateEditModal,
} = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
