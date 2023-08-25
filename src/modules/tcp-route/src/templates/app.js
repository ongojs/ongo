module.exports = (options ={}) => `"use strict";

const Redis = require("ioredis");

/*
|--------------------------------------------------------------------------
| TCP Routes: ${options.title} Namespace
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
  
  // ${options.title} namespace
  const ${options.namespace} = io.of("/${options.endpoint}");

  // subscribing
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  const ${options.onConnection} = (socket) => {
    index(io, socket, sub, pub);
    store(io, socket, sub, pub);
    show(io, socket, sub, pub);
    edit(io, socket, sub, pub);
    update(io, socket, sub, pub);
    destroy(io, socket, sub, pub);
  };
  ${options.namespace}.on("connection", ${options.onConnection});
};
`