"use strict";

const Redis = require("ioredis");


const UserController = require('../app/controllers/tcp/UserController');

const {destroy,index,store,show,edit,update} = new UserController;


/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // undefined namespace
  const UserNamespace = io.of("/users");

  // subscription
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  // UserNamespace on connection
  const UserOnConnection = (socket) => {
    
    destroy(io, socket, sub, pub)
    index(io, socket, sub, pub)
    store(io, socket, sub, pub)
    show(io, socket, sub, pub)
    edit(io, socket, sub, pub)
    update(io, socket, sub, pub)

  };
  UserNamespace.on("connection", UserOnConnection);
};
