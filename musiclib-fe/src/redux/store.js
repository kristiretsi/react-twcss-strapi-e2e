import { configureStore } from "@reduxjs/toolkit";

import navbarReducer from "./slices/navbarSlice";
import artistReducer from "./slices/artistSlice";
import authReducer from "./auth/authSlice";
import modalReducer from "./slices/modalSlice"
import searchReducer from "./slices/searchSlice"
import artistDetailsReducer from "./slices/artistDetailsSlice"
import albumDetailsReducer from "./slices/albumDetailsSlice"
import favoritesReducer from "./slices/favoritesSlice"

const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        artists: artistReducer,
        auth: authReducer,
        modal: modalReducer,
        search: searchReducer,
        artistDetails: artistDetailsReducer,
        albumDetails: albumDetailsReducer,
        favorites: favoritesReducer,
    },
});

export default store;