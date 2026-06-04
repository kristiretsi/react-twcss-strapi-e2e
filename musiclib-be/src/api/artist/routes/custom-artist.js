'use strict';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/artists/sync',
            handler: 'artist.sync',
            config: {
                auth: false,
            },
        },
    ],
};