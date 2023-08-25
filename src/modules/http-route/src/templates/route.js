module.exports = (options = {}) => `
"use strict";

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
    app.get("/${options.endpoint}", (req, res, next) => {});
    app.post("/${options.endpoint}", (req, res, next) => {});
    app.get("/${options.endpoint}/:id", (req, res, next) => {});
    app.post('/${options.endpoint}/:id', (req, res, next) => {})
    app.put("/${options.endpoint}/:id", (req, res, next) => {});
    app.delete("/${options.endpoint}/:id", (req, res, next) => {});  
}
` 