import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../store/features/apiData";

export const store = configureStore({
  reducer: {
    apiData: apiReducer,
  },
});
