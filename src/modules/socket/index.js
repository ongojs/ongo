'use strict';
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| The function is wrapped in an immediately invoked function expression (IIFE),
| which allows the module to have its own private scope and prevent any variable conflicts with other code.
| 
| The global variable is passed as a parameter to the function. In the browser,
| the global variable refers to the window object, while in Node.js it refers to the global scope.
|
*/

(global => {

    /*
    |----------------------------------------------------------------------------------
    | MODULE DEFINITION
    |----------------------------------------------------------------------------------
    |
    | The module is defined as an object or a function.

    |
    */

    const serverOptions = () => ({
        cors: {
            origin: 'http://localhost:3000',  // Allow requests from this origin
            method: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
            allowedHeaders: [],  // Allowed custom headers
            credentials: true,  // Allow sending cookies with requests
        },
        maxHttpBufferSize: 1e8,  // Maximum size of HTTP buffer
        pingTimeout: 60000,  // Timeout for ping responses
    })



    const socket = (server = {}, options = serverOptions()) => {

        // Create a Redis pub client and a duplicated sub client
        const pubClient = createClient({ url: "redis://localhost:6379" });
        const subClient = pubClient.duplicate();

        // Create a new socket.io server instance and pass in the server and options
        const io = new Server(server, options);
        // Set up socket.io to use the Redis pub/sub system for scaling and broadcasting
        io.adapter(createAdapter(pubClient, subClient));

        return io;
    }


    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the socket object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = socket;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.socket.
    |
    */

    else global.socket = socket;
})(this)