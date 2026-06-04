// src/api/axios-api.js

import axios from "axios";

const axiosAPI = axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// GET request
export const getRequest = async (url, config = {}) => {
    try {
        const response = await axiosAPI.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// POST request
export const postRequest = async (url, data, config = {}) => {
    try {
        const response = await axiosAPI.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// PUT request
export const putRequest = async (url, data, config = {}) => {
    try {
        const response = await axiosAPI.put(url, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// PATCH request
export const patchRequest = async (url, data, config = {}) => {
    try {
        const response = await axiosAPI.patch(url, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// DELETE request
export const deleteRequest = async (url, config = {}) => {
    try {
        const response = await axiosAPI.delete(url, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default axiosAPI;