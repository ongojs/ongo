module.exports = (options ={}) => `"use strict";

const Redis = require("ioredis");


const ${options.controller.name} = require('${options.controller.depth}app/controllers/tcp/${options.controller.path}');

const {${options.result.methods}} = new ${options.controller.name};


/*
|--------------------------------------------------------------------------
| TCP Routes: ${options.title} Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // ${options.title} namespace
  const ${options.router.namespace} = io.of("/${options.router.endpoint}");

  // subscription
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  // ${options.router.namespace} on connection
  const ${options.router.onConnection} = (socket) => {
    ${options.module}
  };
  ${options.router.namespace}.on("connection", ${options.router.onConnection});
};
`