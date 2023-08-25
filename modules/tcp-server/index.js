"use strict";


///https://stackoverflow.com/questions/32743754/using-redis-as-pubsub-over-socket-io
/**
 * @author Afros In Tech <afrosintech@gmail.com> <https://github.com/afrosintech> <https://gitlab.com/afrosintech> <https://www.npmjs.com/~afrosintech> <+1.385.204.5167>
 *
 * @module TCPServer
 * @kind class
 *
 * @extends Server
 * @requires Server
 * @requires express
 * @requires http
 * @requires cors
 * @requires redis-adapter
 * @requires redis
 * @classdesc TCPServer class
 */

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
const redis = require('socket.io-redis');
const ioRedis = require("ioredis");

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();


const {readdirSync,statSync } = require('fs');

const { join } = require('path');
const { Readable } = require('stream')
const  {get, request} = require('https');
const {parse} = require('url');
// const { channel } = require("diagnostics_channel");
// const { allowedNodeEnvironmentFlags } = require("process");

class TCPServer extends Server {
  constructor(
    corsOptions = {
      origin: "http://127.0.0.1:5500",
      credentials: true,
      "access-control-allow-credentials": true,
      withCredentials: true,
      allowedHeaders: ["Access-Control-Allow-Origin"],
      optionSuccessStatus: 200
    },
    server = {},
    ...arrayOfObjects
  ) {
    const defaultOpts = {
      origin: "http://127.0.0.1:5500",
      credentials: true,
      "access-control-allow-credentials": true,
      withCredentials: true,
      allowedHeaders: ["Access-Control-Allow-Origin"],
      optionSuccessStatus: 200
    };

    Object.keys(defaultOpts).forEach((key) => {
      if (!corsOptions[key]) {
        corsOptions[key] = defaultOpts[key];
      }
    });

    const app = express();
    app.use(cors(corsOptions));
    const httpServer = createServer(app);
    super(httpServer, {
      cors: {
        origin:
          server && server.cors && server.cors.origin
            ? server.cors.origin
            : "http://127.0.0.1:5500",
        method:
          server && server.cors && server.cors.method
            ? server.cors.method
            : ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:
          server && server.cors && server.cors.allowedHeaders
            ? server.cors.allowedHeaders
            : [],
        transports:
          server && server.cors && server.cors.transports
            ? server.cors.transports
            : ["websocket", "polling"],
        credentials:
          server && server.cors && server.cors.credentials
            ? server.cors.credentials
            : true
      },
      maxHttpBufferSize:
        server && server.maxHttpBufferSize ? server.maxHttpBufferSize : 1e8,
      pingTimeout: server && server.pingTimeout ? server.pingTimeout : 6000,
      // adapter: createAdapter(pubClient, subClient),
      allowEIO3: server && server.allowEIO3 ? server.allowEIO3 : true
    });

    arrayOfObjects.forEach((option) => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          if (!this[key]) this[key] = option[key];
        });
      }
    });

    this.sub = new ioRedis();// createClient();
    this.pub = new ioRedis() ;//createClient();
    this.subC  = createClient();
    this.pubC = createClient();
   
    this.adapter(redis({ host: 'localhost', port: 6379 }));

    // auto bind methods
    this.autobind(TCPServer);
    // auto invoke methods
    this.autoinvoker(TCPServer);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  filePath(path = "", base = "./app/controllers/http") {
    return join(base, path);
  }

  /**
     * @name getFiles
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Base}
     * 
     */
  getFiles(dirPath) {
    {
      files = readdirSync(dirPath);

      arrayOfFiles = arrayOfFiles || [];

      files.forEach(function (file) {
        if (statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(join(__dirname, dirPath, "/", file));
        }
      });
      return arrayOfFiles;
    }
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
     * @return {Base}
     * 
     */
  async readdirRecursive(dirPath, files = []) {
    try {
      const allFiles = await fs.promises.readdir(dirPath);
      if (allFiles) {
        for await (let file of allFiles) {
          if ((await fs.promises.stat(dirPath + "/" + file)).isDirectory()) {
            files = readdirRecursive(dirPath + "/" + file, files);
          } else {
            // files.push(path.join(__dirname, dirPath, "/", file))
          }
        }
      }
      //return files;
    } catch (error) {
      return error;
    }
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
     * @return {Base}
     * 
     */

  getFromIterable(
    iterable = {} | [],
    options = { objectMode: true, encoding: "utf-8", autoDestroy: true }
  ) {
    return Readable.from(JSON.stringify(iterable), options);
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
  buffer(data) {
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
  bufferToString(data) {
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
  apiGet(url, options = {}, fn = (result, data) => {}, data = []) {
    get(url, options, (response) => {
      response.on("data", (chunk) => {
        data.push(chunk);
      });
      response.on("error", (error) => {
        this.emit("apiGet-error", error);
      });
      response.on("end", () => {
        this.emit("apiGet", JSON.parse(Buffer.concat(data).toString()));
        fn(JSON.parse(Buffer.concat(data).toString()), data);
      });
    });
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
  apiRequest(url, options, fn = (result, data) => {}, data = []) {
    request(url, options, (response) => {
      response.on("data", (chunk) => {
        data.push(chunk);
      });
      response.on("error", (error) => {
        this.emit("apiRequest-error", error.message);
        fn(error.message, error);
      });
      response.on("end", () => {
        this.emit("apiRequest", JSON.parse(Buffer.concat(data).toString()));
        fn(JSON.parse(Buffer.concat(data).toString()), data);
      });
    });
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

  post(
    url = parse(url),
    data = JSON.stringify(data),
    headers = {
      "Content-Type": "application/json",
      "Content-Length": data.length
    },
    fn = (result, data) => {},
    datum = ``
  ) {
    const req = request({ ...url, method: "POST", headers }, (response) => {
      response.on("data", (chunk) => {
        datum += chunk;
      });
      response.on("end", () => {
        this.emit("post", JSON.parse(datum));
        fn(JSON.parse(datum), datum);
      });
      response.on("error", (error) => {
        this.emit("error", error.message);
        fn(error.message, error);
      });
    });
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
   * @name methodizeProperty
   * @function
   *
   * @param {Object|Array} classNameList the class whose methods to be bound to it
   *
   * @description get methods from all classes with in-class name list array and makes its own
   *
   * @return does not return anything
   *
   */

  methodizeProperty(...objectWithMethodList) {
    if (objectWithMethodList.length === 0) return;
    objectWithMethodList.forEach((objectWithMethod) => {
      Object.keys(objectWithMethod).forEach((method) => {
        if (!this[method] || this[method] == undefined) {
          this[method] = objectWithMethod[method];
          this[method] = this[method].bind(this);
        }
      });
    });
  }

  /**
   * @name methodizePrototype
   * @function
   *
   * @param {Object|Array} classNameList the class whose methods to be bound to it
   *
   * @description get methods from all classes with in-class name list array and makes its own
   *
   * @return does not return anything
   *
   */
  methodizePrototype(...objectWithMethodList) {
    if (objectWithMethodList.length === 0) return;
    objectWithMethodList.forEach((objectWithMethod) => {
      Object.keys(objectWithMethod).forEach((method) => {
        if (!this[method] || this[method] == undefined) {
          this[method] = objectWithMethod[method];
          this[method] = this[method].bind(this);
        }
      });
    });
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
}

module.exports = TCPServer;














