import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalStateSlice";
import loggedInReducer from "./loggedUserSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		isLoggedIn: loggedInReducer,
	},
});
