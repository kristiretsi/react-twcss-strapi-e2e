"use strict";

module.exports = {
    async findOne(ctx) {
        const { artist, album, autocorrect, username, lang } = ctx.query;

        if (!artist || !album) {
            return ctx.badRequest(
                "Both artist and album are required"
            );
        }

        const result = await strapi
            .service("api::albumdetails.albumdetails")
            .getAlbumInfo(artist, album, {
                autocorrect,
                username,
                lang,
            });

        ctx.body = result;
    },
};