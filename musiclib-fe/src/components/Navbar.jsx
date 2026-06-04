import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useEffect } from "react";
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

    // useEffect(() => {
    //     dispatch(fetchNavbarThunk());
    // }, [dispatch]);
    useEffect(() => {
        if (!menu || menu.length === 0) {
            dispatch(fetchNavbarThunk())
        }
    }, [menu, dispatch])

    return (
        <nav className="flex w-full items-center justify-between px-4 py-3">
            <div className="h-10 w-10">
                {logo ? (
                    <img
                        onClick={() => navigate('/')}
                        src={`${logo.url}`}
                        // src={`http://localhost:1337${logo.url}`}
                        alt="logo"
                        className="cursor-pointer"
                    />
                ) : (
                    <Logo />
                )}
            </div>

            <div className="font-bold flex items-center gap-6 text-on-bg text-sm">
                {menu?.length > 0 && menu.map((r) => {
                    if (r?.needsauth == true && !isAuthenticated) return;

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
                    )

                })}
            </div>

            <div className="flex justify-end items-center gap-4">
                {isAuthenticated ? (
                    <>
                        {/* <span>{user.username}</span>
                        <button onClick={logout}>Logout</button> */}
                        <UserDrawer />
                    </>
                ) : (
                    <button onClick={() => dispatch(openLoginModal())} className="py-1 px-3 accent-grad text-[12px] font-bold flex items-center gap-6 text-white rounded-lg cursor-pointer">
                        Login
                    </button>
                )}
                <div className="hidden sm:block">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;