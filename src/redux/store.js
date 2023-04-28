import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalStateSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
	},
});
