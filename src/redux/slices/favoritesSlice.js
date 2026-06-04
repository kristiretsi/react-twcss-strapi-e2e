import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        albums: [],
        loading: false,
        error: null,
    },
    reducers: {
        setFavorites: (state, action) => {
            state.albums = action.payload;
        },
        setFavoritesLoading: (state, action) => {
            state.loading = action.payload;
        },
        setFavoritesError: (state, action) => {
            state.error = action.payload;
        },
        removeFavoriteLocally: (state, action) => {
            state.albums = state.albums.filter(
                (item) => item.exId !== action.payload
            );
        },
        addFavoriteLocally: (state, action) => {
            state.albums.push(action.payload);
        },
    },
});

export const {
    setFavorites,
    setFavoritesLoading,
    setFavoritesError,
    removeFavoriteLocally,
    addFavoriteLocally,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;