'use strict';

module.exports = {
    async search(ctx) {
        const { q, artistPage, albumPage, trackPage } = ctx.query;

        if (!q) {
            return ctx.badRequest("Missing query param q");
        }

        const result = await strapi
            .service("api::search.search")
            .search(q, null, artistPage, albumPage, trackPage);

        ctx.body = result;
    },
}; 