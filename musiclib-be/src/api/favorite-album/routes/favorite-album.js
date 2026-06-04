module.exports = {
    routes: [
        {
            method: "POST",
            path: "/favorite-albums",
            handler: "favorite-album.create",
            config: {
                auth: {},
            },
        },
        {
            method: "GET",
            path: "/favorite-albums",
            handler: "favorite-album.find",
            config: {
                auth: {},
            },
        },
        {
            method: "DELETE",
            path: "/favorite-albums/:exId",
            handler: "favorite-album.delete",
            config: {
                auth: {},
            },
        },
    ],
};