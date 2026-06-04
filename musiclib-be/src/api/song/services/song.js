'use strict';

const { createCoreService } = require('@strapi/strapi').factories;
const axios = require('axios');

/**
 * Last.fm sync service
 */
module.exports = createCoreService('api::song.song', ({ strapi }) => ({

    async syncFromExternalAPI() {
        try {
            console.log("🚀 LASTFM SYNC START????????????????????????");

            const apiKey = process.env.LASTFM_API_KEY;

            if (!apiKey) {
                throw new Error("Missing LASTFM_API_KEY in .env");
            }

            // STEP 1: fetch top albums
            const url = `https://ws.audioscrobbler.com/2.0/`;

            const res = await axios.get(url, {
                params: {
                    method: "chart.gettopalbums",
                    api_key: apiKey,
                    format: "json",
                    limit: 20,
                }
            });

            const albums = res.data?.albums?.album || [];

            console.log("📦 Albums fetched:", albums.length);

            let created = 0;

            for (const album of albums) {

                console.log("➡️ Processing:", album.name);

                const existing = await strapi.db
                    .query("api::song.song")
                    .findOne({
                        where: {
                            externalId: album.mbid || album.url,
                        },
                    });

                if (existing) {
                    console.log("⏭ Exists:", album.name);
                    continue;
                }

                await strapi.db
                    .query("api::song.song")
                    .create({
                        data: {
                            title: album.name,
                            externalId: album.mbid || album.url,
                            source: "lastfm",

                            artist: album.artist?.name,
                            image: album.image?.[2]?.["#text"],

                            url: album.url,

                            raw: album,
                        },
                    });

                console.log("✅ Created:", album.name);

                created++;
            }

            console.log("🏁 LASTFM SYNC DONE");

            return {
                success: true,
                total: albums.length,
                created,
            };

        } catch (error) {
            console.error("❌ LASTFM ERROR:", error.response?.data || error.message);

            return {
                success: false,
                error: error.response?.data || error.message,
            };
        }
    },

}));