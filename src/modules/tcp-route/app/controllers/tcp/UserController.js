"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module UserController
 * @kind class
 *
 * @extends base
 * @requires base
 *
 * @classdesc UserController class
 */

class UserController extends require("controller") {
    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
     // auto bind methods
     this.autobind(UserController);
     // auto invoke methods
     this.autoinvoker(UserController);
     // add other classes method if methods do not already exist. Argument order matters!
     // this.methodizer(..classList);
     //Set the maximum number of listeners to infinity
     this.setMaxListeners(Infinity);
}

  /**
   * @name index
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Socket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middleware
   *
   * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async index(io, socket, sub, pub, ...args) {}

  /**
   * @name store
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Socket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middleware
   *
   * @description store one or more document in a collection or sends one or more network object to one or more networks and emits event related to the data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async store(io, socket, sub, pub, ...args) {}

  /**
   * @name show
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Socket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middleware
   *
   * @description gets a document from a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async show(io, socket, sub, pub, ...args) {}

  /**
   * @name edit
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Socket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middleware
   *
   * @description edits a document from a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async edit(io, socket, sub, pub, ...args) {}

  /**
   * @name update
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Socket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middleware
   *
   * @description updates a document a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async update(io, socket, sub, pub, ...args) {}

  /**
   * @name destroy
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Socket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middleware
   *
   * @description deletes or removes a document a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async destroy(io, socket, sub, pub, ...args) {}
  
}

module.exports = UserController;
