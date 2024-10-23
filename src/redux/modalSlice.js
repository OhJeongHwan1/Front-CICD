import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationModal: false,
  //
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLocationModal: (state, action) => {
      state.locationModal = action.payload;
    },
  },
});

export const { setLocationModal } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
