"use strict";

const axios = require("axios");

module.exports = () => ({
    async getAlbumInfo(artist, album, options = {}) {
        try {
            console.log("💿 ALBUM.GETINFO START");
            console.log("Artist:", artist);
            console.log("Album:", album);

            const apiKey = process.env.LASTFM_API_KEY;

            if (!apiKey) {
                throw new Error("Missing LASTFM_API_KEY");
            }

            const res = await axios.get(
                "https://ws.audioscrobbler.com/2.0/",
                {
                    params: {
                        method: "album.getinfo",
                        api_key: apiKey,
                        artist,
                        album,
                        format: "json",
                        autocorrect:
                            options.autocorrect ?? 1,
                        username: options.username,
                        lang: options.lang,
                    },
                }
            );

            console.log("✅ ALBUM INFO RECEIVED");

            return {
                album: {
                    ...res.data?.album,
                    exId: res.data?.album?.mbid || `album_${(res.data?.album?.name).replace(/\s+/g, "")}`,
                },
            };
        } catch (error) {
            console.error("❌ ALBUM.GETINFO ERROR");

            if (error.response) {
                console.error(
                    "Status:",
                    error.response.status
                );
                console.error(
                    "Data:",
                    error.response.data
                );
            } else {
                console.error(error.message);
            }

            throw error;
        }
    },
});