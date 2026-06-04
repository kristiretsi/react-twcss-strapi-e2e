import { createSlice } from "@reduxjs/toolkit";

const artistDetailsSlice = createSlice({
    name: "artistDetails",
    initialState: {
        artist: null,
        loading: false,
        error: null,
    },
    reducers: {
        setArtistDetails: (state, action) => {
            state.artist = action.payload.artist;
        },
        setArtistLoading: (state, action) => {
            state.loading = action.payload;
        },
        setArtistError: (state, action) => {
            state.error = action.payload;
        },
        clearArtistDetails: (state) => {
            state.artist = null;
            state.error = null;
        },
    },
});

export const {
    setArtistDetails,
    setArtistLoading,
    setArtistError,
    clearArtistDetails,
} = artistDetailsSlice.actions;

export default artistDetailsSlice.reducer;