module.exports = (options = {}) => `
"use strict";

const ${options.controller.name} = require('${options.controller.depth}app/controllers/http/${options.controller.path}');

const {${options.result.methods}} = new ${options.controller.name};

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
module.exports = app => {
    ${options.module}
}
` 