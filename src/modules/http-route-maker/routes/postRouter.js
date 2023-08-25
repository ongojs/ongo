
"use strict";

const PostController = require('../app/controllers/http/PostController');

const {destroy,index,store,show,edit,update} = new PostController;

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
    
    app.delete("/posts/:id", destroy);
    app.get("/posts", index);
    app.post("/posts", store);
    app.get("/posts/:id", show);
    app.put("/posts/:id", edit);
    app.post("/posts/:id", update);

}
