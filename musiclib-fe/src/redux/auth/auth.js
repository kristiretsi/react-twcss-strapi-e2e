import axios from "axios";

const API = "http://localhost:1337/api";

function setSession(jwt, user) {
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(user));
}

export async function login(email, password) {
    try {
        const res = await axios.post(`${API}/auth/local`, {
            identifier: email,
            password,
        });

        const { jwt, user } = res.data;

        setSession(jwt, user);

        return {
            success: true,
            user,
            token: jwt,
        };
    } catch (error) {
        return {
            success: false,
            status: error?.response?.status || 500,
            message:
                error?.response?.data?.error?.message ||
                "Login failed",
        };
    }
}

export async function register(username, email, password) {
    try {
        const res = await axios.post(`${API}/auth/local/register`,
            {
                username,
                email,
                password,
            }
        );

        const { jwt, user } = res.data;

        setSession(jwt, user);

        return {
            success: true,
            user,
            token: jwt,
        };
    } catch (error) {
        return {
            success: false,
            status: error?.response?.status || 500,
            message:
                error?.response?.data?.error?.message ||
                "Register failed",
        };
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}