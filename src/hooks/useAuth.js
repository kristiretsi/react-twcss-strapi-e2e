import { useDispatch, useSelector } from "react-redux";

import { login as loginReq, logout as logoutReq } from "../redux/auth/auth";

import {
    setLoading,
    setError,
    loginSuccess,
    logout as logoutAction,
} from "../redux/auth/authSlice";

export function useAuth() {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const login = async (email, password) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const result = await loginReq(email, password);

        if (result.success) {
            dispatch(
                loginSuccess({
                    user: result.user,
                    token: result.token,
                })
            );
        } else {
            dispatch(setError(result.message));
        }

        dispatch(setLoading(false));

        return result;
    };

    const logout = () => {
        logoutReq();

        dispatch(logoutAction());
    };

    return {
        ...auth,
        login,
        logout,
    };
}