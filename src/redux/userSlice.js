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
  mySpace: [],
};

export const loginAsync = createAsyncThunk("user/login", async (data) => {
  const response = await api.login(data);
  const token = response.headers.authorization;

  if (token) {
    localStorage.setItem("token", token.slice(7));
    return response.data;
  } else {
    console.error("Token is undefined.");
    return false;
  }
});

export const resignAsync = createAsyncThunk(
  "user/resign",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await api.resignation();
      localStorage.removeItem("token");
      return true;
    } catch (error) {
      console.error("Error during resignation:", error);
      return rejectWithValue(error.response?.data || "Resignation failed");
    }
  }
);

export const getMySpaceListAsync = createAsyncThunk(
  "user/getMySpaceList",
  async (data) => {
    const response = await api.getMySpaceList(data);
    return response.data;
  }
);

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
    setMySpace: (state, action) => {
      state.mySpace = action.payload;
    },
  },
});

export const { userLogOut, setUser, setMySpace } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
