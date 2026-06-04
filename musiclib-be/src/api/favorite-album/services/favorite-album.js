'use strict';

/**
 * favorite-album service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::favorite-album.favorite-album');
