"use strict";

const axios = require("axios");

module.exports = () => ({
    async getArtistInfo(artist, options = {}) {
        try {

            const apiKey = process.env.LASTFM_API_KEY;

            if (!apiKey) {
                throw new Error("Missing LASTFM_API_KEY");
            }

            const baseUrl = "https://ws.audioscrobbler.com/2.0/";

            const res = await axios.get(baseUrl, {
                params: {
                    method: "artist.getinfo",
                    artist,
                    api_key: apiKey,
                    format: "json",
                    lang: options.lang,
                    autocorrect: options.autocorrect ?? 1,
                    username: options.username,
                },
            });

            return {
                artist: {
                    ...res.data?.artist || null,
                    exId: res.data?.artist?.mbid || `artist_${(res.data?.artist?.name).replace(/\s+/g, "")}`
                },
            };
        } catch (error) {
            console.error("❌ ARTIST.GETINFO ERROR");

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