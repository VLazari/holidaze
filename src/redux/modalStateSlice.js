import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLogInModal: false,
  showRegisterModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLogIn: (state) => {
      state.showLogInModal = true;
    },
    hideLogIn: (state) => {
      state.showLogInModal = false;
    },
    openRegister: (state) => {
      state.showRegisterModal = true;
    },
    hideRegister: (state) => {
      state.showRegisterModal = false;
    },
  },
});

export const { openLogIn, hideLogIn, openRegister, hideRegister } =
  modalSlice.actions;

export default modalSlice.reducer;
