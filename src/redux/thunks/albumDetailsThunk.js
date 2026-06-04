import axios from "axios";
import {
    setAlbumDetails,
    setAlbumLoading,
    setAlbumError,
} from "../slices/albumDetailsSlice";

export const fetchAlbumDetails =
    (
        artist,
        album,
        params = {}
    ) =>
        async (dispatch) => {
            try {
                dispatch(setAlbumLoading(true));

                const res = await axios.get(
                    "http://localhost:1337/api/albumdetails",
                    {
                        params: {
                            artist,
                            album,
                            ...params,
                        },
                    }
                );

                dispatch(
                    setAlbumDetails({
                        album: res.data.album || null,
                    })
                );
            } catch (err) {
                dispatch(setAlbumError(err.message));
            } finally {
                dispatch(setAlbumLoading(false));
            }
        };