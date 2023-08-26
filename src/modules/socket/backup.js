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
        writeable.write(`    const io = A new Socket(server).adapter(sio_redis({ host: "localhost", port: 6379 }))`)
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