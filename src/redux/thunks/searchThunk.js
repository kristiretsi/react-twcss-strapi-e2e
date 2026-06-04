import axios from "axios";
import {
    setSearchResults,
    setSearchLoading,
    setSearchError,
} from "../slices/searchSlice";

export const searchMusic =
    (query, pages = { artists: 1, albums: 1, tracks: 1 }, limit = 10) =>
        async (dispatch) => {
            try {
                dispatch(setSearchLoading(true));

                const res = await axios.get("http://localhost:1337/api/search", {
                    params: {
                        q: query,
                        artistPage: pages.artists,
                        albumPage: pages.albums,
                        trackPage: pages.tracks,
                        limit,
                    },
                });

                dispatch(
                    setSearchResults({
                        artists: res.data.artists || [],
                        albums: res.data.albums || [],
                        tracks: res.data.tracks || [],
                        pages: res.data.pages,
                        query,
                    })
                );
            } catch (err) {
                dispatch(setSearchError(err.message));
            } finally {
                dispatch(setSearchLoading(false));
            }
        };