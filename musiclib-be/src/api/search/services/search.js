'use strict';

const axios = require("axios");

module.exports = () => ({

    async search(query, type = null, artistPage = 1, albumPage = 1, trackPage = 1, limit = 10) {

        try {

            const apiKey = process.env.LASTFM_API_KEY;

            if (!apiKey) {
                throw new Error("Missing LASTFM_API_KEY");
            }

            const baseUrl = "https://ws.audioscrobbler.com/2.0/";

            // Search specific type
            if (type) {

                const methodMap = {
                    artist: "artist.search",
                    album: "album.search",
                    track: "track.search",
                };

                const method = methodMap[type];

                if (!method) {
                    throw new Error(`Invalid search type: ${type}`);
                }

                const paramKey =
                    type === "artist"
                        ? "artist"
                        : type === "album"
                            ? "album"
                            : "track";

                const res = await axios.get(baseUrl, {
                    params: {
                        method,
                        api_key: apiKey,
                        format: "json",
                        [paramKey]: query,
                        limit: 10,
                    },
                });

                //console.log("✅ LastFM response received");

                return res.data;
            }

            //console.log("🎯 Searching ALL");

            const [artistsRes, albumsRes, tracksRes] = await Promise.all([
                axios.get(baseUrl, {
                    params: {
                        method: "artist.search",
                        artist: query,
                        api_key: apiKey,
                        format: "json",
                        limit,
                        page: artistPage,
                    },
                }),
                axios.get(baseUrl, {
                    params: {
                        method: "album.search",
                        album: query,
                        api_key: apiKey,
                        format: "json",
                        limit,
                        page: albumPage,
                    },
                }),
                axios.get(baseUrl, {
                    params: {
                        method: "track.search",
                        track: query,
                        api_key: apiKey,
                        format: "json",
                        limit,
                        page: trackPage,
                    },
                }),
            ]);

            const rawArtists =
                artistsRes.data?.results?.artistmatches?.artist || [];

            const enrichedArtists = await Promise.all(
                rawArtists.slice(0, limit).map(async (artist) => {
                    try {
                        const full = await enrichArtist(baseUrl, apiKey, artist.name);

                        if (!full) return artist;

                        return {
                            ...artist,
                            exId: artist.mbid || full.mbid || `artist_${(artist.name).replace(/\s+/g, "")}`,
                            image:
                                full.image?.length && full.image[full.image.length - 1]["#text"]
                                    ? full.image[full.image.length - 1]["#text"]
                                    : artist.image[full.image.length - 1]["#text"],
                        };
                    } catch (err) {
                        return artist;
                    }
                })
            );

            const rawAlbums =
                albumsRes.data?.results?.albummatches?.album || [];

            const enrichedAlbums = await Promise.all(
                rawAlbums.slice(0, limit).map(async (album) => {
                    try {
                        const full = await enrichAlbum(
                            baseUrl,
                            apiKey,
                            album.artist,
                            album.name
                        );

                        if (!full) return album;

                        return {
                            ...album,
                            exId: album.mbid || full.mbid || `album_${(album.name).replace(/\s+/g, "")}`,
                            playcount: full.playcount,
                            listeners: full.listeners,
                            image:
                                full.image?.length && full.image[full.image.length - 1]["#text"]
                                    ? full.image[full.image.length - 1]["#text"]
                                    : album.image[full.image.length - 1]["#text"],
                        };
                    } catch (err) {
                        return album;
                    }
                })
            );

            const rawTracks =
                tracksRes.data?.results?.trackmatches?.track || [];

            const enrichedTracks = await Promise.all(
                rawTracks.slice(0, limit).map(async (track) => {
                    try {
                        const full = await enrichTrack(
                            baseUrl,
                            apiKey,
                            track.artist,
                            track.name
                        );

                        if (!full) return track;

                        return {
                            ...track,
                            exId: track.mbid || full.mbid || `track_${(track.name).replace(/\s+/g, "")}`,
                            listeners: full.listeners,
                            playcount: full.playcount,
                            url: full.url,
                            duration: full.duration,

                            image: full.album?.image?.length
                                ? full.album.image[full.album.image.length - 1]["#text"]
                                : track.image?.[track.image.length - 1]?.["#text"] || null,
                        };
                    } catch (err) {
                        return track;
                    }
                })
            );

            return {
                // artists:
                //     artistsRes.data?.results?.artistmatches?.artist || [],
                artists: enrichedArtists,
                // albums:
                //     albumsRes.data?.results?.albummatches?.album || [],
                albums: enrichedAlbums,
                // tracks:
                //     tracksRes.data?.results?.trackmatches?.track || [],
                tracks: enrichedTracks,
                pages: {
                    artists: artistPage,
                    albums: albumPage,
                    tracks: trackPage,
                }
            };

        } catch (error) {

            console.error("❌ SEARCH ERROR");

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            } else {
                console.error(error.message);
            }

            throw error;
        }
    },
});

async function enrichArtist(baseUrl, apiKey, artistName) {
    const res = await axios.get(baseUrl, {
        params: {
            method: "artist.getinfo",
            artist: artistName,
            api_key: apiKey,
            format: "json",
            autocorrect: 1,
        },
    });

    return res.data?.artist || null;
}

async function enrichAlbum(baseUrl, apiKey, artist, album) {
    const res = await axios.get(baseUrl, {
        params: {
            method: "album.getinfo",
            artist,
            album,
            api_key: apiKey,
            format: "json",
            autocorrect: 1,
        },
    });

    return res.data?.album || null;
}

async function enrichTrack(baseUrl, apiKey, artist, track) {
    const res = await axios.get(baseUrl, {
        params: {
            method: "track.getinfo",
            artist,
            track,
            api_key: apiKey,
            format: "json",
            autocorrect: 1,
        },
    });

    return res.data?.track || null;
}