import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.loginOpen = true;
        },

        closeLoginModal: (state) => {
            state.loginOpen = false;
        },
    },
});

export const {
    openLoginModal,
    closeLoginModal,
} = modalSlice.actions;

export default modalSlice.reducer;