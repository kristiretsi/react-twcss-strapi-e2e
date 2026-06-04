// src/redux/thunks/navbarThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../api/axios-api";

export const fetchNavbarThunk = createAsyncThunk(
    "navbar/fetchNavbar",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosAPI.get(
                "/navbar?populate=*"
            );

            const navbar = data?.data;

            return {
                menu: navbar?.menu || [],
                logo: navbar?.logo || null,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch navbar"
            );
        }
    }
);