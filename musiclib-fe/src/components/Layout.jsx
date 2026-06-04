import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import LoginModal from "./modals/LoginModal";
import { useEffect } from "react";
import Footer from "./Footer";
import FloatingParticles from "./UI/animations/FloatingParticles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    const loginOpen = useSelector(
        (state) => state.modal.loginOpen
    );

    // useEffect(() => {
    //     const lsTheme = localStorage.getItem("theme");
    //     const root = document.documentElement;

    //     if (lsTheme == 'dark') {
    //         root.classList.add("dark");
    //         localStorage.setItem("theme", 'dark');
    //         document.documentElement.style.colorScheme = "dark";
    //     } else {
    //         root.classList.remove("dark");
    //         localStorage.setItem("theme", 'light');
    //         document.documentElement.style.colorScheme = "light";
    //     }
    // }, []);

    return (
        <div className="h-full w-full bg-grad min-h-screen flex flex-col">
            <ToastContainer position="top-right" />
            <Navbar />

            <Outlet />
            <FloatingParticles />
            <Footer />

            {loginOpen && <LoginModal />}
        </div>
    );
};

export default Layout;