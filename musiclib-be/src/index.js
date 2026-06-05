// module.exports = {
//   // register({ strapi }) {
//   //   strapi.cron.add({
//   //     "*/30 * * * * *": async () => {
//   //       // "* * * * *": async () => {
//   //       // "/10 * * * *": async () => {
//   //       await strapi
//   //         .service("api::artist.artist")
//   //         .syncTopArtists();

//   //     },
//   //   });
//   // },
//   register({ strapi }) {
//     console.log("🟢 REGISTER CALLED");

//     strapi.cron.add({
//       "*/30 * * * * *": async () => {
//         console.log("🔥 CRON TRIGGERED", new Date().toISOString());

//         await strapi.service("api::artist.artist").syncTopArtists();
//       },
//     });
//   },
//   async bootstrap({ strapi }) {
//     //TEMP: run once then remove
//     //await require('../scripts/delete-artists')({ strapi });
//   },
// };

module.exports = {
  async bootstrap({ strapi }) {
    console.log("🟢 BOOTSTRAP CALLED");

    strapi.cron.add({
      "*/50 * * * * *": async () => {
        console.log("🔥 CRON TRIGGERED", new Date().toISOString());

        await strapi.service("api::artist.artist").syncTopArtists();
      },
    });
  },
};