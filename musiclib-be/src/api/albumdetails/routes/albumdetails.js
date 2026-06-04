module.exports = {
    routes: [
        {
            method: "GET",
            path: "/albumdetails",
            handler: "albumdetails.findOne",
            config: {
                auth: false,
            },
        },
    ],
};