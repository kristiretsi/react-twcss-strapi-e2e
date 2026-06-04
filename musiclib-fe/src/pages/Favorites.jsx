
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteAlbums } from "../redux/thunks/favoriteAlbum";
import CardGrid from "../components/CardGrid";

const Favorites = () => {
    const dispatch = useDispatch();

    const albums = useSelector((state) => state.favorites.albums);
    const loading = useSelector((state) => state.favorites.loading);
    const error = useSelector((state) => state.favorites.error);

    useEffect(() => {
        dispatch(fetchFavoriteAlbums());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Favorites
            </h1>

            <CardGrid
                cards={albums}
                type="album"
                cardSize="normal"
                favs={true}
            />
        </div>
    );
};

export default Favorites;