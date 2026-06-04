import { useEffect, useState } from "react";
import Sun from '../assets/svgs/sun.svg?react'
import Moon from '../assets/svgs/moon.svg?react'

const ThemeToggle = ({ withText, size }) => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const lsTheme = localStorage.getItem("theme");

        if (lsTheme == 'dark') {
            setDark(true);
        } else {
            setDark(false);
        }
    }, [dark]);

    const handleClick = () => {
        const root = document.documentElement;

        if (dark) {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
            document.documentElement.style.colorScheme = "light";
        } else {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
            document.documentElement.style.colorScheme = "dark";
        }
    };

    const sizeClass =
        size === "big" ? "gap-2 w-full h-full justify-start px-4 py-3 bg-hover rounded-xl" : "w-auto h-auto";

    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-center cursor-pointer ${sizeClass}`}
        >
            <div className="h-4 w-4">
                {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </div>

            {withText && (
                <p className="text-on-bg text-sm font-medium">
                    {dark ? "Dark" : "Light"}
                </p>
            )}
        </button>
    );
};

export default ThemeToggle;