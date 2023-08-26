function   routesIndex() {
    readdirRecursive('./sockets').then(files => {
      const writeable = createWriteStream('./sockets/index.js');
      writeable.write(`'use strict';

const sio_redis = require("socket.io-redis");
const Socket = require("socket");

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
*/\n`)
      // for(let file of files){
      //   // if(!file.includes('index.js')){
      //   //     writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("../../${file.split('.js').join('')}"); \n`)
      //   // }
      //   // if(file.split('/').pop().split('.js').join('') !== 'index'){
      //   //   writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require(".${file.split('.js').join('').split('routes')[1]}"); \n`)
      //   // }
      //  }


       writeable.write(`\n`)
       writeable.write(`module.exports = server => {
        `)
        writeable.write(`\n    `)
        writeable.write(` // build io \n`)
        writeable.write(`    const io = new Server(server,{`)
        writeable.write(`      cors: {`)
        writeable.write(`         origin: 'http://localhost:3000',`)
        writeable.write(`         method: ['GET', 'POST', 'PUT', 'DELETE'],`)
        writeable.write(`         allowedHeaders: [],`)
        writeable.write(`         credentials: true,`)
        writeable.write(`    },`)
        writeable.write(`    maxHttpBufferSize: 1e8,`)
        writeable.write(`    pingTimeout: 60000,`)
        writeable.write(`     });`)
        writeable.write(`    const pubClient = createClient({ url: "redis://localhost:6379" });`)
        writeable.write(`    const subClient = pubClient.duplicate();`)
        writeable.write(`    io.adapter(createAdapter(pubClient, subClient));`)
        writeable.write(`\n    `)
        writeable.write(`\n    `)
       for(let file of files){
        // writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
        if(file.split('/').pop().split('.js').join('') !== 'index'){
          // writeable.write(`require(".${file.split('.js').join('')}")(io);        \n    `)
          writeable.write(`require(".${file.split('.js').join('').split('sockets')[1]}")(io);        \n    `)
        }
       }
    
       writeable.write(`\n`)
       writeable.write(`}`)
    })
    .catch(error => {
      console.log(error)
    })
  }