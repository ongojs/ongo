"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Controller
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Controller class
 */


class Controller extends require("./base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Controller);
    // auto invoke methods
    this.autoinvoker(Controller);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


    /**
   * @name index
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description gets and return all users from the database
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */

     async index(req, res, next) {}
    
    
      /**
       * @name store
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description stores a user or multiple users to  database
       *
       * @return {Object|Array|List}  users collections/array/object
       *
       */
      async store(req, res, next) {}
    
      /**
       * @name show
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description finds a user by id (':id') or username (':username') or email (':email') and returns it
       *
       * @return {Object}  user object
       *
       */
      async show(req, res, next) {}
    
      /**
       * @name edit
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description finds a user by id (':id') or username (':username') or email (':email') and returns it to a view (if any) for editing/updating
       *
       * @return {Object}  user object
       *
       */
      async edit(req, res, next) {}
    
      /**
       * @name update
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description updates a user by id (':id') or username (':username') or email (':email')
       *
       * @return {Object}  user object
       *
       */
      async update(req, res, next) {}
    
      /**
       * @name destroy
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description delete a user by id (':id') or username (':username') or email (':email')
       *
       * @return {Object}  user object
       *
       */
      async destroy(req, res, next) {}
 
}
module.exports = Controller;
