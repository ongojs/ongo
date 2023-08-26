
"use strict";

const UsersController = require('../app/controllers/http/UsersController');

const {index,store,show,edit,update,destroy} = new UsersController;

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
    
    app.get("/users", index);
    app.post("/users", store);
    app.get("/users/:id", show);
    app.put("/users/:id", edit);
    app.post("/users/:id", update);
    app.delete("/users/:id", destroy);

}
