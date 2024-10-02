import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    userDetail: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userDetail } = apiSlice.actions;

export default apiSlice.reducer;
