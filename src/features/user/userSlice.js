import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../api";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
});

// ***** Async Thunks *****
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get({ endpoint: "/user" });
  return response;
});

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async body => {
    const response = await api.post({ endpoint: "/user/register", body });
    return response;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async body => {
  const response = await api.post({ endpoint: "/user/login", body });
  return response;
});

// ***** Slice *****
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: state => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [registerUser.pending]: state => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [loginUser.pending]: state => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;

export const selectUser = state => state.user;
