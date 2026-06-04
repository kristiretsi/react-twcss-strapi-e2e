module.exports = {
  register({ strapi }) {
    strapi.cron.add({
      "*/30 * * * * *": async () => {
        // "* * * * *": async () => {
        // "/10 * * * *": async () => {
        await strapi
          .service("api::artist.artist")
          .syncTopArtists();

      },
    });
  },
  async bootstrap({ strapi }) {
    //TEMP: run once then remove
    //await require('../scripts/delete-artists')({ strapi });
  },
};