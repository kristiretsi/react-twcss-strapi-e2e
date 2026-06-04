import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        // results: {
        //     artists: [],
        //     albums: [],
        //     tracks: [],
        //     pages: {
        //         artists: 1,
        //         albums: 1,
        //         tracks: 1,
        //     }
        // },
        results: null,
        loading: false,
        error: null,
        query: "",
    },
    reducers: {
        setSearchResults: (state, action) => {
            state.results = action.payload;
        },
        setSearchLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchError: (state, action) => {
            state.error = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.results = {
                artists: [],
                albums: [],
                tracks: [],
            };
            state.query = "";
        },
    },
});

export const {
    setSearchResults,
    setSearchLoading,
    setSearchError,
    setSearchQuery,
    clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;