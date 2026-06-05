import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name: "artists",
    initialState: {
        items: [],
        loading: false,
        error: null,
        meta: null
    },
    reducers: {
        setArtists: (state, action) => {
            state.items = action.payload;
        },
        setArtistsMeta: (state, action) => {
            state.meta = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setArtists, setArtistsMeta, setLoading, setError } = artistSlice.actions;
export default artistSlice.reducer;