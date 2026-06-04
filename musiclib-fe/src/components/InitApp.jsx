import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchNavbarThunk } from '../redux/thunks/navbarThunk'
import { router } from '../App'
import AppLoader from '../components/UI/animations/AppLoader'

export default function InitApp() {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const lsTheme = localStorage.getItem("theme");
        const root = document.documentElement;

        if (lsTheme == 'dark') {
            root.classList.add("dark");
            localStorage.setItem("theme", 'dark');
            document.documentElement.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", 'light');
            document.documentElement.style.colorScheme = "light";
        }
    }, []);

    useEffect(() => {
        async function bootstrap() {
            try {
                setReady(false)
                const minDelay = new Promise((res) => setTimeout(res, 3000))

                const bootstrapData = dispatch(fetchNavbarThunk()).unwrap()

                await Promise.all([bootstrapData, minDelay])

            } catch (e) {
                console.error("Bootstrap failed", e)
            } finally {
                setReady(true)
            }
        }

        bootstrap()
    }, [])

    if (!ready) {
        return <AppLoader />
    }

    return <RouterProvider router={router} />
}