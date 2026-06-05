'use strict';

const { createCoreService } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreService('api::artist.artist', ({ strapi }) => ({

    async syncTopArtists() {

        try {

            const apiKey = process.env.LASTFM_API_KEY;
            const page = 1;
            const limit = 200;

            if (!apiKey) {
                throw new Error("Missing LASTFM_API_KEY");
            }

            const params = {
                method: "chart.gettopartists",
                api_key: apiKey,
                format: "json",
                limit: String(limit),
                page: String(page),
            };

            const baseUrl = "https://ws.audioscrobbler.com/2.0/";

            const res = await axios.get(baseUrl, {
                params,
            });

            const artists = res.data?.artists?.artist || [];

            let created = 0;
            let updated = 0;

            for (const a of artists) {

                const albumImage = await getTopAlbumImage(baseUrl, apiKey, a.name);

                const fallbackSmall = a.image?.[0]?.["#text"] || null;
                const fallbackMedium = a.image?.[1]?.["#text"] || null;
                const fallbackLarge = a.image?.[2]?.["#text"] || null;

                const artistData = {
                    name: a.name,
                    externalId: a.mbid ? `${a.mbid}` : `artist_${a.name}`,
                    source: "lastfm",

                    playcount: Number(a.playcount || 0),
                    listeners: Number(a.listeners || 0),

                    url: a.url,

                    // imageSmall: albumImage || fallbackSmall,
                    // imageMedium: albumImage || fallbackMedium,
                    // imageLarge: albumImage || fallbackLarge,
                    image: albumImage,
                    imageSmall: albumImage,
                    imageMedium: albumImage,
                    imageLarge: albumImage,

                    raw: a,
                };

                const existing = await strapi.db
                    .query("api::artist.artist")
                    .findOne({
                        where: {
                            externalId: artistData.externalId,
                        },
                    });

                if (existing) {
                    await strapi.db
                        .query("api::artist.artist")
                        .update({
                            where: { id: existing.id },
                            data: artistData,
                        });
                    updated++;

                } else {

                    await strapi.db
                        .query("api::artist.artist")
                        .create({
                            data: artistData,
                        });

                    created++;
                }
            }

            console.log("🏁 LASTFM SYNC DONE");

            return {
                success: true,
                total: artists.length,
                created,
                updated,
            };

        } catch (error) {

            console.error(
                "❌ LASTFM ERROR:",
                error.response?.data || error.message
            );

            return {
                success: false,
                error: error.response?.data || error.message,
            };
        }
    },

}));

async function getTopAlbumImage(baseUrl, apiKey, artistName) {
    try {
        const res = await axios.get(baseUrl, {
            params: {
                method: "artist.gettopalbums",
                artist: artistName,
                api_key: apiKey,
                format: "json",
                limit: 1,
                autocorrect: 1,
            },
        });

        const album = res.data?.topalbums?.album?.[0];
        if (!album) return null;

        const images = album.image || [];


        const lastImage = [...images]
            .reverse()
            .find(i => i["#text"]);


        return lastImage?.["#text"] || null;

    } catch (e) {
        return null;
    }
}