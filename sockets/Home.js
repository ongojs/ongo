"use strict";

const Redis = require("ioredis");


const HomeController = require('../app/controllers/tcp/HomeController');

const {index} = new HomeController;


/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // undefined namespace
  const HomeNamespace = io.of("/home");

  // subscribing
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  // HomeNamespace on connection
  const HomeOnConnection = (socket) => {
    
    index(HomeNamespace, socket, sub, pub)

  };
  HomeNamespace.on("connection", HomeOnConnection);
};
