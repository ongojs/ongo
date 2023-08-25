module.exports  = (options = {}) => `"use strict";
const sio_redis = require("socket.io-redis");
const Socket = require("socket");
const AppsNamespace = require("./apps");

/*
|--------------------------------------------------------------------------
| TCP Routes
|--------------------------------------------------------------------------
|
| Here is where you can register your TCP routes for your application.
|
| Important:  there is no need to import web routes  from anywhere else within
| the application because they are automatically  mounted to the main app.
| 
|
*/

module.exports = (server) => {
  AppsNamespace(new Socket(server).adapter(sio_redis({ host: "localhost", port: 6379 })));
};
`