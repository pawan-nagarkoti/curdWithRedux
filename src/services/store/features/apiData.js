import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  userId: null,
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    userDetail: (state, action) => {
      state.value = action.payload;
    },
    getEditUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userDetail, getEditUserId } = apiSlice.actions;

export default apiSlice.reducer;
