
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
    app.get("/chats", (req, res, next) => {});
    app.post("/chats", (req, res, next) => {});
    app.get("/chats/:id", (req, res, next) => {});
    app.post('/chats/:id', (req, res, next) => {})
    app.put("/chats/:id", (req, res, next) => {});
    app.delete("/chats/:id", (req, res, next) => {});  
}
