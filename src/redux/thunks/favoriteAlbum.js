import axios from "axios";
import { addFavoriteLocally, removeFavoriteLocally, setFavorites, setFavoritesError, setFavoritesLoading } from "../slices/favoritesSlice";
import { toast } from "react-toastify";


// export const toggleFavoriteAlbum =
//     (album, isFav) => async (dispatch, getState) => {
//         try {
//             const token = getState().auth.token;

//             if (isFav) {
//                 await axios.delete(
//                     `http://localhost:1337/api/favorite-albums/${album.id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 dispatch(removeFavoriteLocally(album.id));
//             } else {
//                 const res = await axios.post(
//                     "http://localhost:1337/api/favorite-albums",
//                     {
//                         exId: album.id,
//                         name: album.name,
//                         artist: album.artist,
//                         image:
//                             album.image?.[0]?.["#text"],
//                     },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 dispatch(addFavoriteLocally(res.data));
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };


export const toggleFavoriteAlbum =
    (album, isFav) => async (dispatch, getState) => {
        try {
            const token = getState().auth.token;

            if (isFav) {
                await axios.delete(
                    `http://localhost:1337/api/favorite-albums/${album.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                dispatch(removeFavoriteLocally(album.id));

                toast.success("Removed from favorites.");
            } else {
                const res = await axios.post(
                    "http://localhost:1337/api/favorite-albums",
                    {
                        exId: album.id,
                        name: album.name,
                        artist: album.artist,
                        image: album.image?.[0]?.["#text"] || album.image,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                dispatch(addFavoriteLocally(res.data));

                toast.success("Added to favorites.");
            }
        } catch (err) {
            console.error(err);

            toast.error(
                err?.response?.data?.error?.message ||
                "Something went wrong."
            );
        }
    };

// export const fetchFavoriteAlbums =
//     () => async (dispatch, getState) => {
//         try {
//             dispatch(setFavoritesLoading(true));

//             const token = getState().auth.token;

//             const res = await axios.get(
//                 "http://localhost:1337/api/favorite-albums",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             dispatch(setFavorites(res.data));
//         } catch (err) {
//             dispatch(setFavoritesError(err.message));
//         } finally {
//             dispatch(setFavoritesLoading(false));
//         }
//     };

export const fetchFavoriteAlbums =
    () => async (dispatch, getState) => {
        try {
            dispatch(setFavoritesLoading(true));

            const token = getState().auth.token;

            const res = await axios.get(
                "http://localhost:1337/api/favorite-albums",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setFavorites(res.data));

        } catch (err) {
            dispatch(setFavoritesError(err.message));
            toast.error("Failed to load favorites.");
        } finally {
            dispatch(setFavoritesLoading(false));
        }
    };