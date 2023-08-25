"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Client
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 * @requires get
 * @requires request
 * @requires parse
 * @classdesc Client class
 */

// const { createReadStream, createWriteStream, promises } = require("fs");
const { promises, existsSync } = require('fs');
const { Readable } = require('stream')
const  {get, request} = require('https');
const {parse} = require('url')


class Client extends require('net').Socket{

  constructor(...arrayOfObjects) {

    // super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    super();

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    if(!this.port) this.port = 8000;
    if(!this.host) this.host = '127.0.0.1';

    // auto bind methods
    this.autobind(Client);
    // auto invoke methods
    this.autoinvoker(Client);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  start(fn = () => {}, port = this.port, host = this.host){
    return this.connect(port, host, fn);
  }

  /**
     * @name getFromIterable
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Client}
     * 
     */

  getFromIterable(
    iterable = {} | [],
    options = { objectMode: true, encoding: "utf-8", autoDestroy: true }
  ) {
    return Readable.from(JSON.stringify(iterable), options);
  }

  /**
   * @name autobinder
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets and auto binds every and all methods for the corresponding class (except the constructor)
   *
   * @return does not return anything
   *
   */

  autobinder(className = {}) {
    for (let method of Object.getOwnPropertyNames(className.prototype)) {
      if (typeof this[method] === "function" && method !== "constructor") {
        this[method] = this[method].bind(this);
      }
    }
  }

  /**
   * @name autobind
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto mounts and auto binds every and all methods for the corresponding class including
   *  itself(itself mounts and self binds)
   *
   * @return does not return anything
   *
   */

  autobind(className = {}) {
    this.autobinder = this.autobinder.bind(this);
    this.autobinder(className);
  }

  /**
   * @name methodizer
   * @function
   *
   * @param {Object|Array} classNameList the class whose methods to be bound to it
   *
   * @description get methods from all classes with in-class name list array and makes its own
   *
   * @return does not return anything
   *
   */

  methodizer(...classNamesList) {
    if (classNamesList.length === 0) return;
    for (let className of classNamesList) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
        if (this[method] === undefined || !this[method]) {
          if (typeof className.prototype[method] === "function") {
            this[method] = className.prototype[method];
            // auto bind each method form className class to this
            this[method] = this[method].bind(this);
          }
        }
      }
    }
  }

  /**
   * @name autoinvoker
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets and auto invokes every and all methods for the corresponding class
   *
   * @return does not return anything
   *
   */

  autoinvoker(className = {}) {
    for (let method of Object.getOwnPropertyNames(className.prototype)) {
      this.autoinvoked().forEach((name) => {
        if (method === name) {
          this[method]();
        }
      });
    }
  }

  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

  autoinvoked() {
    return [""];
  }


   /**
   * @name buffer
   * @function
   *
   * @param {Object} data the data to JSON parse
   *
   * @description JSON parses the buffered data
   *
   * @return JSON parsed buffered data;
   *
   */
  buffer(data){
    return JSON.parse(Buffer(data));
  }


   /**
   * @name bufferToString
   * @function
   *
   * @param {Object} data the data to stringify
   *
   * @description Stringifies buffered json parsed data;
   *
   * @return stringified json parsed buffered data
   *
   */
  bufferToString(data){
    return JSON.parse(Buffer(data).toString());
  }

   /**
   * @name apiGet
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https get request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiGet(url, options = {}, fn = (result, data) => {}, data = []){
      get(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('apiGet-error', error);
         });
         response.on('end', () => {
            this.emit('apiGet', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
      return this;
   }


   /**
   * @name apiRequest
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiRequest(url, options, fn = (result, data) => {}, data = []){
        request(url, options, response => {
            response.on('data', chunk => {
                data.push(chunk);
             });
             response.on('error', error => {
                this.emit('apiRequest-error', error.message);
                fn(error.message, error)
             });
             response.on('end', () => {
                this.emit('apiRequest', JSON.parse(Buffer.concat(data).toString()));
                fn(JSON.parse(Buffer.concat(data).toString()), data);
             });
        })
   }


    /**
   * @name post
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Array} data the resulting object of the https request call;
   * @param {Object} headers the https request option object
   * @param {Function} fn the callback function 
   * @param {String} datum the resulting object of the https request call;
  
   *
   * @description makes an https post request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */


   post(url = parse(url), data = JSON.stringify(data), headers = {'Content-Type': 'application/json','Content-Length': data.length
   }, fn = (result, data) => {}, datum = ``){

     const req =  request({...url, method: 'POST', headers}, response => {
        response.on('data', chunk => {
            datum += chunk;
        })
        response.on('end', () => {
            this.emit('post', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
        })
        response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
        })
     })
     req.write(datum);
     req.end();
   }

   removeDuplicateListeners(event) {
    if (this.rawListeners(event).length > 1) {
      for (let i = 1; i < this.rawListeners(event).length; i++) {
        this.removeListener(event, this.rawListeners(event)[i]);
      }
    }
  }

}

module.exports = Client;

// const client = new Client({port: 8000})

// //define the server port and host


// client.start(() => {
//     console.log(`Connected to server on ${client.host}:${client.port}`);
//     //Connection was established, now send a message to the server.
//     client.write('Hello from TCP client');
//  });
//  //Add a data event listener to handle data coming from the server
//  client.on('data',function(data){
//     console.log(`Server Says : ${data}`); 
//  });
//  //Add Client Close function
//  client.on('close',function(){
//     console.log('Connection Closed');
//  });
//  //Add Error Event Listener
//  client.on('error',function(error){
//     console.error(`Connection Error ${error}`); 
//  });
