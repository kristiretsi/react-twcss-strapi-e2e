'use strict';

const { createCoreService } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreService('api::artist.artist', ({ strapi }) => ({

    async syncTopArtists() {

        try {

            //console.log("🚀 LASTFM SYNC START");

            const apiKey = process.env.LASTFM_API_KEY;
            const page = 1;
            const limit = 200;

            // console.log("METHOD SENT:", "chart.gettopartists");
            //console.log("API KEY EXISTS:", !!apiKey);

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

            //console.log(params);

            const res = await axios.get("https://ws.audioscrobbler.com/2.0/", {
                params,
            });

            const artists = res.data?.artists?.artist || [];
            // console.log(artists);

            let created = 0;
            let updated = 0;

            for (const a of artists) {

                const artistData = {
                    name: a.name,
                    // externalId: a.mbid || a.url,
                    externalId: a.mbid ? `mbid:${a.mbid}` : `name:${a.name}`,
                    source: "lastfm",

                    playcount: Number(a.playcount || 0),
                    listeners: Number(a.listeners || 0),

                    url: a.url,

                    imageSmall: a.image?.[0]?.["#text"] || null,
                    imageMedium: a.image?.[1]?.["#text"] || null,
                    imageLarge: a.image?.[2]?.["#text"] || null,

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

                    // console.log("♻️ Updated:", artistData.name);

                } else {

                    await strapi.db
                        .query("api::artist.artist")
                        .create({
                            data: artistData,
                        });

                    created++;

                    // console.log("✅ Created:", artistData.name);
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