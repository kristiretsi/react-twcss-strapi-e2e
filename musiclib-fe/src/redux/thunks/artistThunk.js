import axios from "axios";
import {
    setArtists,
    setLoading,
    setError,
} from "../slices/artistSlice";

export const fetchArtists = (pageN, pageSizeN) => async (dispatch) => {

    try {

        dispatch(setLoading(true));

        const res = await axios.get(
            // "http://localhost:1337/api/artists", {
            `${import.meta.env.VITE_API_URL}/artists`, {
            params: {
                pagination: {
                    page: pageN,
                    pageSize: pageSizeN,
                },
                sort: ["playcount:desc"],
            },
        });



        const data = res.data.data.map((item) => ({
            id: item.id,
            listeners: item.listeners,
            playcount: item.playcount,
            name: item.name,
            image: item.imageLarge,
            ...item.attributes,
        }));

        dispatch(setArtists(data));

    } catch (err) {

        dispatch(setError(err.message));

    } finally {

        dispatch(setLoading(false));
    }
};