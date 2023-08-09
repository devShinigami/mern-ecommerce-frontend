import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    authenticated: false,
    userId: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUser, setAuthenticated, setUserId } = userSlice.actions;

export default userSlice.reducer;
