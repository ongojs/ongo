"use strict";

const Redis = require("ioredis");


const UsersController = require('../app/controllers/tcp/UsersController');

const {index,store,show,edit,update,destroy} = new UsersController;


/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // undefined namespace
  const UserRouteNamespace = io.of("/users");

  // subscription
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  // UserRouteNamespace on connection
  const UserRouteOnConnection = (socket) => {
    
    index(io, socket, sub, pub)
    // store(io, socket, sub, pub)
    // show(io, socket, sub, pub)
    // edit(io, socket, sub, pub)
    // update(io, socket, sub, pub)
    // destroy(io, socket, sub, pub)

  };
  UserRouteNamespace.on("connection", UserRouteOnConnection);
};
