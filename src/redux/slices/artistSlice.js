import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name: "artists",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        setArtists: (state, action) => {
            state.items = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setArtists, setLoading, setError } = artistSlice.actions;
export default artistSlice.reducer;