module.exports = {
    async sync(ctx) {
        console.log("🔥 CONTROLLER HIT");

        const result = await strapi
            .service("api::song.song")
            .syncFromExternalAPI();

        ctx.body = result;
    },
};