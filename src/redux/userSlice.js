import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  user: {
    userId: null,
    nickName: "",
    profile: null,
    email: "",
  },
  //
};

export const loginAsync = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await api.login(data);
    const token = response.headers.authorization;

    if (token) {
      localStorage.setItem("token", token.slice(7));
      return response.data;
    } else {
      console.error("Token is undefined.");
      return false;
    }
  } catch {
    console.error("Error during login:", error);
    return false;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogOut: (state, action) => {
      state.user = initialState.user;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLogOut, setUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
