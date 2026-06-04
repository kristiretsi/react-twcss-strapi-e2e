module.exports = {
    syncArtists: {
        task: async ({ strapi }) => {
            await strapi.service("api::artist.artist").syncTopArtists();
        },
        options: {
            rule: "/10 * * * *",
        },
    },
};