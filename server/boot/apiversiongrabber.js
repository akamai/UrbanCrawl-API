var loopback = require('loopback');

module.exports = function(app, bootCallback) {
    // Set the values for apiVersion for all requests coming in
    app.use(function (req, res, next) {
        var matches = req.path.match(/^\/(v\d+)\/.*/i);
        if (matches && matches.length > 1) {
           // this requires some sort of context plugin to provide the apiVersion across execution of this call. Loopback no longer really recommends their context plugin
            req.apiVersion = matches[1];
            // console.log("BOOTSCRIPT: apiVersion ",req.apiVersion);
        }
        // Disabling defaulting to V2 on July 23, 2018
        // else{
        //     //DEFAULTING TO V2
        //     console.log("BOOTSCRIPT: defaulting to V2 ");
        //     req.apiVersion = 'v2';
        // }
        next();
    });

    bootCallback();
};