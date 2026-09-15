import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../types/user";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;
      state.isAuthenticated = true;
    },

    setAccessToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken =
        action.payload;
      state.isAuthenticated = true;
    },

    setUser: (
      state,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  setAccessToken,
  setUser,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;