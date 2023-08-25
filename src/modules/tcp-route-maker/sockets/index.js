'use strict';

const sio_redis = require("socket.io-redis");
const Socket = require("socket");
// const sockets = require("./sockets");
/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!

|
*/

module.exports = server => {
        
     // build io 
    const io = new Socket(server).adapter(sio_redis({ host: "localhost", port: 6379 }))
    
    require("./ArticleRouter")(io);        
    require("./ChatRouter")(io);        
    require("./ForumRouter")(io);        
    require("./PostRouter")(io);        
    require("./UserRouter")(io);        
    
}