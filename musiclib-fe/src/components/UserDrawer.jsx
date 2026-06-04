import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

import { useAuth } from "../hooks/useAuth";

const UserDrawer = () => {
    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);

    const drawerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="relative" ref={drawerRef}>

            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full accent-grad text-sm font-bold text-white"
            >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {open && (
                <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-zinc-200 modal-bg shadow-2xl dark:border-zinc-700">

                    <div className="border-b border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full accent-grad text-lg font-bold text-white">
                                {user?.username
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                            </div>

                            <div>
                                <div className="font-bold text-on-bg">
                                    {user?.username}
                                </div>

                                <div className="text-sm text-zinc-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block sm:hidden">
                        <div className="flex items-center justify-start border-t border-zinc-200  dark:border-zinc-700 p-2">
                            <ThemeToggle withText size="big" />
                        </div>
                    </div>


                    <div className="border-t border-zinc-200 p-2 dark:border-zinc-700">
                        <button
                            onClick={logout}
                            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDrawer;