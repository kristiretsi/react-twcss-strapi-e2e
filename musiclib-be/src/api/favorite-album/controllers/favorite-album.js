"use strict";

module.exports = {


    async create(ctx) {

        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized();
        }

        const { name, artist, image, exId } = ctx.request.body;

        const albumData = await strapi
            .service("api::albumdetails.albumdetails")
            .getAlbumInfo(artist, name);

        if (!albumData) {
            return ctx.badRequest("Album not found");
        }

        // console.log(albumData)

        const result = await strapi.entityService.create(
            "api::favorite-album.favorite-album",
            {
                data: {
                    name: albumData.album.name,
                    exId: exId || albumData.mbid || `album_${(albumData.album.name).replace(/\s+/g, "")}`,
                    artist: albumData.album.artist,
                    image:
                        albumData.album.image?.slice(-1)?.[0]?.["#text"] || null,

                    playcount: albumData.album.playcount,
                    listeners: albumData.album.listeners,
                    // url: albumData.album.url,

                    users_permissions_user: user.id,
                },
            }
        );

        ctx.body = result;
    },

    async find(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized("No user");
        }

        const result = await strapi.entityService.findMany(
            "api::favorite-album.favorite-album",
            {
                filters: {
                    users_permissions_user: user.id,
                },
                // populate: ["cover"],
            }
        );

        ctx.body = result;
    },

    // async delete(ctx) {
    //     const { id } = ctx.params;

    //     const result = await strapi.entityService.delete(
    //         "api::favorite-album.favorite-album",
    //         id
    //     );

    //     ctx.body = result;
    // },
    async delete(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized();
        }

        const { exId } = ctx.params;

        const entries = await strapi.entityService.findMany(
            "api::favorite-album.favorite-album",
            {
                filters: {
                    exId,
                    users_permissions_user: user.id,
                },
            }
        );

        if (!entries.length) {
            return ctx.notFound("Favorite not found");
        }

        const result = await strapi.entityService.delete(
            "api::favorite-album.favorite-album",
            entries[0].id
        );
        console.log(result)
        ctx.body = result;
    }
};