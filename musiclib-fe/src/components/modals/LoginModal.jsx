import { useState } from "react";

import { useDispatch } from "react-redux";

import { closeLoginModal } from "../../redux/slices/modalSlice";
import { useAuth } from "../../hooks/useAuth";
import LogoLoading from "../UI/animations/LogoLoading";

const LoginModal = () => {
    const dispatch = useDispatch();

    const { login, loading } = useAuth();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password);

        if (!result?.success) {
            setError(result?.message);
        } else {
            dispatch(closeLoginModal());
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl modal-bg p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Login
                    </h2>

                    <button
                        onClick={() =>
                            dispatch(closeLoginModal())
                        }
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="rounded-lg border p-3 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="rounded-lg border p-3 outline-none"
                    />

                    {error && (
                        <div className="text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center w-full mt-4"><LogoLoading /></div>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg accent-grad py-3 font-bold text-white text-sm"
                        >
                            {/* {loading ? "Loading..." : "Login"}  */}
                            Login
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginModal;