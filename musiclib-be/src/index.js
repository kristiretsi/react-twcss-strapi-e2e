module.exports = {
  register({ strapi }) {
    strapi.cron.add({
      "* * * * *": async () => {
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