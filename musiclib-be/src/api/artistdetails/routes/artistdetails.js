module.exports = {
    routes: [
        {
            method: "GET",
            path: "/artistdetails/:id",
            handler: "artistdetails.findOne",
            config: {
                auth: false,
            },
        },
    ],
};