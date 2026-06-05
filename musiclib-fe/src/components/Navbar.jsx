// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "./Logo";
// import ThemeToggle from "./ThemeToggle";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNavbarThunk } from "../redux/thunks/navbarThunk";
// import { useAuth } from "../hooks/useAuth";
// import { openLoginModal } from "../redux/slices/modalSlice";
// import UserDrawer from "./UserDrawer";

// const Navbar = () => {
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { user, logout, isAuthenticated } = useAuth();

//     const menu = useSelector((state) => state.navbar.menu);
//     const logo = useSelector((state) => state.navbar.logo);

//     useEffect(() => {
//         if (!menu || menu.length === 0) {
//             dispatch(fetchNavbarThunk())
//         }
//     }, [menu, dispatch])

//     return (
//         <nav className="flex w-full items-center justify-between px-4 py-3">
//             <div className="h-10 w-10">
//                 {logo ? (
//                     <img
//                         onClick={() => navigate('/')}
//                         src={`${logo.url}`}
//                         // src={`http://localhost:1337${logo.url}`}
//                         alt="logo"
//                         className="cursor-pointer"
//                     />
//                 ) : (
//                     <Logo />
//                 )}
//             </div>

//             <div className="font-bold flex items-center gap-6 text-on-bg text-sm">
//                 {menu?.length > 0 && menu.map((r) => {
//                     if (r?.needsauth == true && !isAuthenticated) return;

//                     return (
//                         <div
//                             key={r.id}
//                             className={
//                                 r.href === "/"
//                                     ? location.pathname === "/"
//                                         ? "border-b border-pink-500 accent-color"
//                                         : ""
//                                     : location.pathname.startsWith(r.href)
//                                         ? "border-b border-pink-500 accent-color"
//                                         : ""
//                             }
//                         >
//                             <Link to={r.href}>{r.label}</Link>
//                         </div>
//                     )

//                 })}
//             </div>

//             <div className="flex justify-end items-center gap-4">
//                 {isAuthenticated ? (
//                     <>
//                         {/* <span>{user.username}</span>
//                         <button onClick={logout}>Logout</button> */}
//                         <UserDrawer />
//                     </>
//                 ) : (
//                     <button onClick={() => dispatch(openLoginModal())} className="py-1 px-3 accent-grad text-[12px] font-bold flex items-center gap-6 text-white rounded-lg cursor-pointer">
//                         Login
//                     </button>
//                 )}
//                 <div className="hidden sm:block">
//                     <ThemeToggle />
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavbarThunk } from "../redux/thunks/navbarThunk";
import { useAuth } from "../hooks/useAuth";
import { openLoginModal } from "../redux/slices/modalSlice";
import UserDrawer from "./UserDrawer";

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, logout, isAuthenticated } = useAuth();

    const menu = useSelector((state) => state.navbar.menu);
    const logo = useSelector((state) => state.navbar.logo);

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (!menu || menu.length === 0) {
            dispatch(fetchNavbarThunk());
        }
    }, [menu, dispatch]);

    const handleNavigate = (href) => {
        setMobileOpen(false);
        navigate(href);
    };

    console.log(mobileOpen);

    return (
        <>
            <nav className="flex w-full items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-on-bg text-xl"
                        onClick={() => setMobileOpen(true)}
                    >
                        ☰
                    </button>
                    <div className="h-10 w-10">
                        {logo ? (
                            <img
                                onClick={() => navigate("/")}
                                src={logo.url}
                                alt="logo"
                                className="cursor-pointer"
                            />
                        ) : (
                            <Logo />
                        )}
                    </div>
                </div>


                {/* Desktop menu */}
                <div className="hidden md:flex font-bold items-center gap-6 text-on-bg text-sm">
                    {menu?.length > 0 &&
                        menu.map((r) => {
                            if (r?.needsauth && !isAuthenticated) return null;

                            return (
                                <div
                                    key={r.id}
                                    className={
                                        r.href === "/"
                                            ? location.pathname === "/"
                                                ? "border-b border-pink-500 accent-color"
                                                : ""
                                            : location.pathname.startsWith(r.href)
                                                ? "border-b border-pink-500 accent-color"
                                                : ""
                                    }
                                >
                                    <Link to={r.href}>{r.label}</Link>
                                </div>
                            );
                        })}
                </div>

                {/* Right side */}
                <div className="flex justify-end items-center gap-4">

                    {/* <button
                        className="md:hidden text-on-bg text-2xl"
                        onClick={() => setMobileOpen(true)}
                    >
                        ☰
                    </button> */}

                    {isAuthenticated ? (
                        <UserDrawer />
                    ) : (
                        <button
                            onClick={() => dispatch(openLoginModal())}
                            className="py-1 px-3 accent-grad text-[12px] font-bold flex items-center gap-6 text-white rounded-lg cursor-pointer"
                        >
                            Login
                        </button>
                    )}

                    <div className={`${isAuthenticated ? "hidden sm:block" : "block"}`}>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* ================= MOBILE MENU OVERLAY ================= */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 dark:bg-black/70 bg-black/60  backdrop-blur-sm position-relative">

                    {/* <div
                        className="absolute inset-0"
                        onClick={() => setMobileOpen(false)}
                    /> */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl absolute right-4 top-4 text-white z-90"
                    >
                        ✕
                    </button>

                    <div className="absolute right-0 top-0 h-full w-full bg-bg p-6 flex flex-col items-center justify-center gap-8 z-70">


                        <div className="flex justify-center items-center text-center">
                            <span className="text-lg font-bold text-white">Menu</span>
                        </div>


                        <div className="flex flex-col gap-6 text-lg font-semibold text-center">
                            {menu?.length > 0 &&
                                menu.map((r) => {
                                    if (r?.needsauth && !isAuthenticated) return null;

                                    return (
                                        <button
                                            key={r.id}
                                            onClick={() => handleNavigate(r.href)}
                                            className='text-white'
                                        >
                                            {r.label}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;