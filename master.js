'use strict';
const cluster = require("cluster");
const { createServer } = require("net");
const farmhash = require("farmhash");

const dotenv = require('./src/modules/dotenv');//.config();
const config = require('./config');//()

dotenv.config();
config();
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

    const normalizePort = val => {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }


    const port = normalizePort(process.env.PORT || '3000' || process.env.SERVER_PORT);

    const num_processes = require("os").cpus().length;

    const master = () => {
        // Stores workers and references them based on source IP address.
        // It is also useful for auto-restart.
        const workers = [];

        // Helper function for spawning worker at index 'i'.
       const spawn = function (i) {
            workers[i] = cluster.fork();

            // Optional: Restart worker on exit
            workers[i].on("exit", function (code, signal) {
                console.log("respawning worker", i);
                spawn(i);
            });
        };

        // Spawn workers.
        for (var i = 0; i < num_processes; i++) {
            spawn(i);
        }

        // Helper function for getting a worker index based on IP address.
        // This is a hot path so it should be really fast. The way it works
        // is by converting the IP address to a number by removing non numeric
        // characters, then compressing it to the number of slots we have.
        //
        // Compared against "real" hashing (from the sticky-session code) and
        // "real" IP number conversion, this function is on par in terms of
        // worker index distribution only much faster.
        const worker_index = function (ip, len) {
            return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
        };

        // Create the outside facing server listening on our port.
        const server = createServer({ pauseOnConnect: true }, function (connection) {
            // We received a connection and need to pass it to the appropriate
            // worker. Get the worker for this connection's source IP and pass
            // it the connection.
            const worker = workers[worker_index(connection.remoteAddress, num_processes)];
            worker.send("sticky-session:connection", connection);
        }).listen(port);
    }

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the master object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = master;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.master.
    |
    */

    else global.master = master;
})(this)