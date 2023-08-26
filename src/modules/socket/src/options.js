"use strict";
require('../../dotenv').config()

/*
|--------------------------------------------------------------------------
| Socket.io Server Class Constructor Options Object
|--------------------------------------------------------------------------
|
| 
|
*/

module.exports = () => ({
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [],
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

