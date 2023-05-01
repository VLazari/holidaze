import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem, clearStorage } from "../utils/useLocalStorage";

const initialState = {
	isLogIn: getItem("user") ? true : false,
	userData: getItem("user") ? getItem("user") : {},
};

export const loggedUserSlice = createSlice({
	name: "isLoggedIn",
	initialState,
	reducers: {
		setLoggedUser: (state, actions) => {
			state.isLogIn = true;
			state.userData = { ...actions.payload };
			setItem("user", state.userData);
		},
		removeLoggedUser: (state) => {
			state.isLogIn = false;
			state.userData = {};
			clearStorage();
		},
	},
});

export const { setLoggedUser, removeLoggedUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
