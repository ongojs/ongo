'use strict';
const cluster = require("cluster");
const { createServer } = require("net");
const farmhash = require("farmhash");

require('./src/modules/dotenv').config();
require('./config')();


const normalizePort = val => {

    const port = parseInt(val, 10);

    // named pipe
    if (isNaN(port)) return val;

    // port number
    if (port >= 0) return port;

    return false;
}

const port = normalizePort(process.env.PORT || '3000' || process.env.SERVER_PORT);

const num_processes = require("os").cpus().length;

module.exports = () => {
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

