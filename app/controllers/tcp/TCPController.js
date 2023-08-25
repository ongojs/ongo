"use strict";

/**
 *
 * @module TCPController
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc TCPController class
 */

const Controller = require('../Controller');
class TCPController extends Controller {
    constructor(...arrayOfObjects) {
        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        // Assign additional options to the base class
        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach((key) => {
                    if (!this[key]) this[key] = option[key];
                });
            }
        });

        // Auto bind methods of the base class
        this.autobind(TCPController);

        // Auto invoke methods of the base class
        this.autoinvoker(TCPController);

        // Add methods from other classes if they do not already exist
        // Example: this.methodizer(...classList);

        // Set the maximum number of event listeners to infinity
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
    async index(io, socket, sub, pub, ...args) { }

    /**
     * @name create
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
    async create(io, socket, sub, pub, ...args) { }

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
     * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
     *
     * @return {EventEmitter}  emits an event or collections of events
     *
     */
    async store(io, socket, sub, pub, ...args) { }


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
     * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
     *
     * @return {EventEmitter}  emits an event or collections of events
     *
     */

    async show(io, socket, sub, pub, ...args) { }


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

    async edit(io, socket, sub, pub, ...args) { }

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

    async update(io, socket, sub, pub, ...args) { }

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

    async destroy(io, socket, sub, pub, ...args) { }
}

module.exports = TCPController;
