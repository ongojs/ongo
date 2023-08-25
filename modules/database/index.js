// Copyright (c) 2023 Ericson S. Weah <ericsonweah.dev>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


'use strict';
require('../dotenv').config();
const Client = require('../client');
const couleurs = require('../couleurs');
const { IRed } = couleurs();
/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| The function is wrapped in an immediately invoked function expression (IIFE),
| which allows the module to have its own private scope and prevent any variable conflicts with other code.
| 
| The global variable is passed as a parameter to the function. In the browser,
| the global variable refers to the window object, while in Node.js it refers to the global scope.
|
*/

(global => {
  /*
  |----------------------------------------------------------------------------------
  | MODULE DEFINITION
  |----------------------------------------------------------------------------------
  |
  | The module is defined as an object or a function.

  |
  */

  /**
   * Generates a method for interacting with a MongoDB database.
   *
   * @param {Object} Observable - The Observable object.
   * @param {Object} client - The MongoDB client (default: new Client()).
   * @returns {Function} - The generated method.
   */
  const dbMethod = (Observable, client = new Client(Observable.url)) =>
    (method = 'commandHelp', fn = () => { }, toArray = false, event = 'commandHelp' || method) => async (...args) => {
      try {
        let dbResult;
        const database = client.db(Observable.db);
        if (toArray) dbResult = await database[`${method}`](...args).toArray();
        else dbResult = await database[`${method}`](...args);
        if (event) Observable.emit(`${event}`, dbResult);
        else Observable.emit(`${method}`, dbResult);
        fn(null, dbResult);
        return dbResult;
      } catch (err) {
        if (event) Observable.emit(`${event}-error`, IRed(`${err.message}`));
        else Observable.emit(`${method}-error`, IRed(`${err.message}`));
        fn(IRed(`${err.message}`), null)
        return IRed(`${err.message}`);
      } finally {
        await client.close();
      }
    };

  /**
  * This function generates a method for interacting with a MongoDB database based on the provided parameters.
  * It allows you to perform various operations on the database, such as running database commands.
  * The method takes the following parameters:
  *
  * @param {Object} Observable - The Observable object that emits events.
  * @param {Object} client - The MongoDB client used to connect to the database (default: new Client()).
  * @param {string} method - The method name for the database operation (default: 'commandHelp').
  * @param {boolean} toArray - Specifies whether to convert the result to an array (default: false).
  * @param {...*} args - Additional arguments to pass to the database method.
  *
  * The generated method connects to the MongoDB database, performs the specified database operation with the given arguments,
  * emits the corresponding event on the Observable object, and returns the result.
  * If an error occurs, it emits the error event and returns the error.
  * Finally, it closes the MongoDB client connection.
  *
  * Use this generated method to interact with MongoDB databases in a convenient and standardized way.
  * Customize the method name and other parameters based on your specific use case.
  */

  /*
  |----------------------------------------------------------------------------------
  | EXPORTS MODULE IN NODEJS ENVIRONMENTS
  |----------------------------------------------------------------------------------
  |
  | The module is exported using an if/else statement. If the module object is defined and
  | has an exports property, then the module is being used in Node.js and we export 
  | the query object by assigning it to module.exports
  |
  |
  */

  if (typeof module !== 'undefined' && module.exports) module.exports = dbMethod;

  /*
  |----------------------------------------------------------------------------------------
  | EXPORT MODULE IN BROWSER ENVIRONMENTS
  |----------------------------------------------------------------------------------------
  |
  | If module is not defined or does not have an exports property, then the module is being used
  | in the browser and we attach the myModule object to the global object (which is the window object
  | in the browser) by assigning it to global.query.
  |
  */

  else global.dbMethod = dbMethod;
})(this)