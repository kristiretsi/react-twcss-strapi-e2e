import { createSlice } from "@reduxjs/toolkit";

const albumDetailsSlice = createSlice({
    name: "albumDetails",
    initialState: {
        album: null,
        loading: false,
        error: null,
    },
    reducers: {
        setAlbumDetails: (state, action) => {
            state.album = action.payload.album;
        },
        setAlbumLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAlbumError: (state, action) => {
            state.error = action.payload;
        },
        clearAlbumDetails: (state) => {
            state.album = null;
            state.error = null;
        },
    },
});

export const {
    setAlbumDetails,
    setAlbumLoading,
    setAlbumError,
    clearAlbumDetails,
} = albumDetailsSlice.actions;

export default albumDetailsSlice.reducer;