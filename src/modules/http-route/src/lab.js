const {readdirRecursive} = require('lib');
const {createWriteStream} = require('fs')

const path = '../../../routes';
const writeable = createWriteStream('../index.js')

writeable.write(`'use strict';
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

readdirRecursive(path)
.then(files => {
    
    const routerObject = {}
   for(let file of files){
    if(!file.includes('index.js')){
        routerObject[file.split('/').pop().split('.js').join('')] = `require(${file})`;
        writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("${file}"); \n`)
    }
   }

   writeable.write(`\n`)
   writeable.write(`module.exports = app => {
    `)
    writeable.write(`\n    `)
   for(let file of files){
    if(!file.includes('index.js')){
        writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
    }
   }

   writeable.write(`\n`)
   writeable.write(`}`)

//    console.log(routerObject)
})
.catch(error => {
    console.log(error)
})