// src/redux/slices/navbarSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchNavbarThunk } from "../thunks/navbarThunk";

const navbarSlice = createSlice({
    name: "navbar",

    initialState: {
        menu: [],
        logo: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchNavbarThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNavbarThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.menu = action.payload.menu;
                state.logo = action.payload.logo;
            })
            .addCase(fetchNavbarThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default navbarSlice.reducer;