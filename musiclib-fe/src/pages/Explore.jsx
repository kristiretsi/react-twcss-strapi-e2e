import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMusic } from "../redux/thunks/searchThunk";
import { setSearchResults } from "../redux/slices/searchSlice";

import CardGrid from "../components/CardGrid";
import SearchBar from "../components/UI/inputs/SearchBar";
import TopArtists from "./TopArtists";
import { useEffect } from "react";

import ArtistIcon from "../assets/artist.png"
import AlbumIcon from "../assets/album.png"
import TrackIcon from "../assets/track.png"
import SearchIcon from "../assets/search.webp"
import ArtistDetails from "./ArtistDetails";
import { fetchFavoriteAlbums } from "../redux/thunks/favoriteAlbum";

function Explore() {
    const location = useLocation();
    const dispatch = useDispatch();

    const results = useSelector((state) => state.search.results);
    const loading = useSelector((state) => state.search.loading);

    const pages = results?.pages ?? {
        artists: 1,
        albums: 1,
        tracks: 1,
    };

    const query = results?.query ?? "";

    const changeArtistPage = (newPage) => {
        if (!results?.query) return;

        dispatch(searchMusic(results.query, {
            ...pages,
            artists: newPage
        }));
    };

    const changeAlbumPage = (newPage) => {
        if (!results?.query) return;

        dispatch(searchMusic(results.query, {
            ...pages,
            albums: newPage
        }));
    };

    const changeTrackPage = (newPage) => {
        if (!results?.query) return;

        dispatch(searchMusic(results.query, {
            ...pages,
            tracks: newPage
        }));
    };

    useEffect(() => {
        dispatch(fetchFavoriteAlbums());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(setSearchResults(null));
        };
    }, []);

    return (
        <div>
            <SearchBar />

            <div className="p-4">
                {loading && <p>Loading...</p>}

                {results && !loading && (
                    <div className="flex flex-col gap-10">


                        <CardGrid
                            cardSize="small"
                            title="Albums"
                            cards={results.albums}
                            page={pages.albums}
                            setPage={(p) => changeAlbumPage(p)}
                            maxPage={10}
                            type={"album"}
                        />

                        <CardGrid
                            cardSize="small"
                            title="Tracks"
                            cards={results.tracks}
                            page={pages.tracks}
                            setPage={(p) => changeTrackPage(p)}
                            maxPage={10}
                            type={"track"}
                        />

                        <CardGrid
                            cardSize="small"
                            title="Artists"
                            cards={results.artists}
                            page={pages.artists}
                            setPage={(p) => changeArtistPage(p)}
                            maxPage={10}
                            image={TrackIcon}
                            type={"artist"}
                        />
                    </div>
                )}

                {!results && !loading && (
                    <div className="h-full w-full flex items-center justify-center flex-col mt-10">
                        <img className="max-h-44 float-drift" src={SearchIcon} alt="Explore" />
                        <h1 className="text-lg sm:text-xl font-extrabold text-on-bg text-center">Discover Artists, Albums & Tracks</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Explore;