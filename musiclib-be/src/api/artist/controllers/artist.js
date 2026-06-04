// module.exports = {
//   async sync(ctx) {
//     const result = await strapi
//       .service("api::artist.artist")
//       .syncTopArtists();

//     ctx.body = result;
//   },
// };

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::artist.artist',
  ({ strapi }) => ({

    async sync(ctx) {

      const result = await strapi
        .service('api::artist.artist')
        .syncTopArtists();

      ctx.body = result;
    },

  })
);