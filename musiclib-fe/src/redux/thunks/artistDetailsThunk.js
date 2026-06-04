import axios from "axios";
import {
    setArtistDetails,
    setArtistLoading,
    setArtistError,
} from "../slices/artistDetailsSlice";

export const fetchArtistDetails =
    (id, params = {}) =>
        async (dispatch) => {
            try {
                dispatch(setArtistLoading(true));

                const res = await axios.get(
                    `http://localhost:1337/api/artistdetails/${id}`,
                    { params }
                );

                dispatch(
                    setArtistDetails({
                        artist: res.data.artist || null,
                    })
                );
            } catch (err) {
                dispatch(setArtistError(err.message));
            } finally {
                dispatch(setArtistLoading(false));
            }
        };