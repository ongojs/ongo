"use strict";

const Redis = require("ioredis");

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/
// Resource functions
const index = (io, socket, sub, pub) => {}
const store = (io, socket, sub, pub) => {}
const show = (io, socket, sub, pub) => {}
const edit = (io, socket, sub, pub) => {}
const update = (io, socket, sub, pub) => {}
const destroy = (io, socket, sub, pub) => {}

module.exports = (io) => {
  
  // undefined namespace
  const PostRouterNamespace = io.of("/posts");

  // subscribing
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  const PostRouterOnConnection = (socket) => {
    index(io, socket, sub, pub);
    store(io, socket, sub, pub);
    show(io, socket, sub, pub);
    edit(io, socket, sub, pub);
    update(io, socket, sub, pub);
    destroy(io, socket, sub, pub);
  };
  PostRouterNamespace.on("connection", PostRouterOnConnection);
};
