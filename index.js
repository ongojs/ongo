"use strict";
const path = require('path');
const express = require("express");
const cluster = require("cluster");
const { createServer } = require("net");
const farmhash = require("farmhash");
const morgan = require("morgan");
const cors = require("cors");
const {renderFile} = require('ejs')



require('dotenv').config();
require('./config')()
const port = 8080 | process.env.PORT || process.env.SERVER_PORT;

const num_processes = require("os").cpus().length;

if (cluster.isMaster) {
  // Stores workers and references them based on source IP address.
  // It is also useful for auto-restart.
  var workers = [];

  // Helper function for spawning worker at index 'i'.
  var spawn = function (i) {
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
  var worker_index = function (ip, len) {
    return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
  };

  // Create the outside facing server listening on our port.
  var server = createServer({ pauseOnConnect: true }, function (connection) {
    // We received a connection and need to pass it to the appropriate
    // worker. Get the worker for this connection's source IP and pass
    // it the connection.
    var worker = workers[worker_index(connection.remoteAddress, num_processes)];
    worker.send("sticky-session:connection", connection);
  }).listen(port);
} else {
  // No port used here because the master listens on it.
  const app = new express();


  // Middleware,attach (or mount) routes, etc.
  // require('./config/env')

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use(express.static('public'));
  app.engine('html', renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, './views'));


  const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: process.env.SOCKETIO_CLIENT_CORS_CREDENTIALS,
    "access-control-allow-credentials": true,
    withCredentials: true, 
    allowedHeaders: ['Access-Control-Allow-Origin'],
    optionSuccessStatus: 200,
  };

//   app.use(cors(corsOptions));
//   const routes = require("./routes");
  // Mount Web Routes (HTTP routes to main app)
//   app.use(routes);
app.get('/', (req, res, next) => {
    res.send('it works');
})



  // Add a route to accept incoming post requests for the fileupload.
  // Also, attach two callback functions to handle the response.

  // Don't expose internal server to the outside.
  const server = app.listen(0, "localhost");

  // Mount TCP Routes (sockets) to main app
//   require("./sockets")(server);

  // Here you might use Socket.IO middleware for authorization etc.

  // Listen to messages sent from the master. Ignore everything else.
  process.on("message", function (message, connection) {
    if (message !== "sticky-session:connection") {
      return;
    }
    // Emulate a connection event on the server by emitting the
    // event with the connection the master sent.
    server.emit("connection", connection);

    connection.resume();
  });
}
