import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAlbumDetails } from "../redux/thunks/albumDetailsThunk";

const AlbumDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { artist, album } = useParams();

    const albumData = useSelector(
        (state) => state.albumDetails.album
    );
    const loading = useSelector(
        (state) => state.albumDetails.loading
    );
    const error = useSelector(
        (state) => state.albumDetails.error
    );

    useEffect(() => {
        if (artist && album) {
            dispatch(
                fetchAlbumDetails(
                    artist,
                    album,
                    { autocorrect: 1 }
                )
            );
        }
    }, [artist, album, dispatch]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (!albumData) return <div>No album found.</div>;

    const cover =
        albumData.image?.[
        albumData.image.length - 1
        ]?.["#text"];

    return (
        <>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="w-fit mb-4 px-3 py-1 rounded-md text-sm accent-grad text-white ml-3 cursor-pointer"
            >
                Back
            </button>
            <div className="p-6">
                <div className="flex gap-6">
                    {cover && (
                        <img
                            src={cover}
                            alt={albumData.name}
                            className="w-64 h-64 object-cover rounded-xl"
                        />
                    )}

                    <div>
                        <h1 className="text-4xl font-bold">
                            {albumData.name}
                        </h1>

                        <h2 className="text-xl text-zinc-400 mt-2">
                            {albumData.artist}
                        </h2>

                        {albumData.playcount && (
                            <p className="mt-4">
                                {albumData.playcount} plays
                            </p>
                        )}

                        {albumData.listeners && (
                            <p>
                                {albumData.listeners} listeners
                            </p>
                        )}
                    </div>
                </div>

                {albumData.wiki?.summary && (
                    <div
                        className="mt-8 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: albumData.wiki.summary,
                        }}
                    />
                )}

                {albumData.tracks?.track?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">
                            Tracks
                        </h3>

                        <div className="space-y-2">
                            {albumData.tracks.track.map(
                                (track, index) => (
                                    <div
                                        key={`${track.name}-${index}`}
                                        className="flex justify-between border-b border-zinc-800 py-2"
                                    >
                                        <span>
                                            {index + 1}.{" "}
                                            {track.name}
                                        </span>

                                        <span>
                                            {track.duration
                                                ? `${Math.floor(
                                                    track.duration /
                                                    60
                                                )}:${String(
                                                    track.duration %
                                                    60
                                                ).padStart(2, "0")}`
                                                : ""}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AlbumDetails;