module.exports = {
    routes: [
        {
            method: "POST",
            path: "/songs/sync",
            handler: "song.sync",
            config: {
                auth: false,
            },
        },
    ],
};