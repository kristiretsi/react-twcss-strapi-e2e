import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            state.loading = false;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    setUser,
    setToken,
    setLoading,
    setError,
    loginSuccess,
    logout,
} = authSlice.actions;

export default authSlice.reducer;