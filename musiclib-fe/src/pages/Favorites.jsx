
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteAlbums } from "../redux/thunks/favoriteAlbum";
import CardGrid from "../components/CardGrid";
import LogoLoading from "../components/UI/animations/LogoLoading";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const albums = useSelector((state) => state.favorites.albums);
    const loading = useSelector((state) => state.favorites.loading);
    const error = useSelector((state) => state.favorites.error);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
            return;
        };
        dispatch(fetchFavoriteAlbums());
    }, [dispatch, isAuthenticated]);

    if (loading) return <div className="flex items-center justify-center w-full mt-4"><LogoLoading /></div>;
    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Favorites
            </h1>
            {albums.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full mt-4">
                    <div className="text-on-bg text-sm">You have no favorite albums yet.</div>
                    <div className="mt-4 text-on-bg text-center text-sm">
                        Go to the <span className="accent-color font-semibold text-lg cursor-pointer" onClick={() => navigate("/explore")}>
                            Explore
                        </span> page to add some!
                    </div>
                </div>
            ) : (
                <CardGrid
                    cards={albums}
                    type="album"
                    cardSize="normal"
                    favs={true}
                />
            )}
        </div>
    );
};

export default Favorites;