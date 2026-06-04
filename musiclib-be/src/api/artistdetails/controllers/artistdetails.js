"use strict";

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const { lang, autocorrect, username } = ctx.query;

    if (!id) {
      return ctx.badRequest("Missing artist identifier");
    }

    const result = await strapi
      .service("api::artistdetails.artistdetails")
      .getArtistInfo(id, {
        lang,
        autocorrect,
        username,
      });

    ctx.body = result;
  },
};