

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/search",
            handler: "search.search",
            config: {
                auth: false,
            },
        },
    ],
};