// module.exports = {
//   routes: [
//     {
//       method: "POST",
//       path: "/artists/sync",
//       handler: "artist.sync",
//       config: {
//         auth: false,
//       },
//     },
//   ],
// };

'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::artist.artist');