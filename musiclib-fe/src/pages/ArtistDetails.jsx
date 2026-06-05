import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArtistDetails } from "../redux/thunks/artistDetailsThunk";
import LogoLoading from "../components/UI/animations/LogoLoading";

const ArtistDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const artist = useSelector((state) => state.artistDetails.artist);
    const loading = useSelector((state) => state.artistDetails.loading);
    const error = useSelector((state) => state.artistDetails.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchArtistDetails(id, { autocorrect: 1 }));
        }
    }, [id, dispatch]);

    if (loading) return <div className="flex items-center justify-center w-full mt-4"><LogoLoading /></div>;
    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!artist) return null;

    return (
        <> 
            <button
                onClick={() => navigate(-1)}
                className="w-fit mb-4 px-3 py-1 rounded-md text-sm accent-grad text-white ml-3 cursor-pointer"
            >
                Back
            </button>
            <div className="my-5 flex flex-col text-center items-center justify-center gap-10">

                <h1 className="text-4xl font-bold">{artist.name}</h1>

                {artist.image?.length > 0 && (
                    <img
                        src={artist.image[artist.image.length - 1]["#text"]}
                        alt={artist.name}
                    />
                )}

                <div
                    dangerouslySetInnerHTML={{
                        __html: artist.bio?.summary || "",
                    }}
                />
            </div>
        </>

    );
};

export default ArtistDetails;