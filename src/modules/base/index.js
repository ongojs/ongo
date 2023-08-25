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

"use strict";
/**
 *
 * @module Base
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @require socket.io
 * @requires socket.io-client
 * @requires redis 
 * @requires @socket.io/redis-adapter
 * @classdesc Base class
 */

const fs = require('fs');
const path = require('path');
const {Transform, Readable, Writable } = require('stream');

const https = require('https');
const http = require('http');
const { io } = require('socket.io-client');
const { URL } = require('url');
const { createWriteStream, createReadStream } = require('fs');

const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");


/**
 * Represents a Base class that extends the Transform class from the stream module.
 */
class Base extends Transform {
  /**
   * Constructs a new instance of the Base class.
   *
   * @param {...Object} arrayOfObjects - Additional objects containing options to be assigned to the base class.
   */
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
    this.autobind(Base);

    // Auto invoke methods of the base class
    this.autoinvoker(Base);

    // Add methods from other classes if they do not already exist
    // Example: this.methodizer(...classList);

    // Set the maximum number of event listeners to infinity
    this.setMaxListeners(Infinity);

  }


  /**
   * The Base class represents a base class that extends the Transform class from the stream module.
   * It provides a convenient way to create a base class instance with custom options and functionality.
   * The class accepts additional objects containing options to be assigned to the base class.
   * Customize the options and functionality based on your specific requirements.
   */


  /**
     * Create a TCP server with specified HTTP methods and allowed origins.
     * @param {string[]} methods - The allowed HTTP methods (e.g., "GET", "POST").
     * @param {...string} origins - The allowed origins for CORS.
     * @returns {object} - An object containing the created server and Socket.IO instance.
     */

  createTCPServer(methods = ["GET", "HEAD", "OPTIONS", "POST", "PUT"], ...origins) {

    const server = http.createServer();
    const io = new Server(server, {
      cors: {
        origin: [...origins],
        credentials: true,
        allowedHeaders: ['Access-Control-Allow-Headers', 'Content-Type', 'Authorization'],
        methods: methods,
        maxHttpBufferSize: 1e8
      }
    });
    return { server, io }
  }

  /**
    * Create a TCP server with Redis support using the specified Redis client options.
    * @param {object} createClientOptions - The options to create the Redis client.
    * @param {string} createClientOptions.host - The host of the Redis server.
    * @param {number} createClientOptions.port - The port of the Redis server.
    * @returns {Server} - The Socket.IO server instance with Redis adapter.
    */
  createTCPServerWithRedis(createClientOptions = { host: "localhost", port: 6379 }) {
    // Create the Redis pub/sub clients
    const pubClient = createClient(createClientOptions);
    const subClient = pubClient.duplicate();

    // Create the Socket.IO server with Redis adapter
    return new Server({
      adapter: createAdapter(pubClient, subClient)
    });
  }

  /**
    * Create a TCP client to connect to the specified server.
    * @param {string} server - The URL of the server to connect to.
    * @returns {object} - The Socket.IO client instance.
    */
  createTCPClient(serverURL = 'http://localhost:8000', options = { secure: true }) {
    return io(serverURL, options);
  }

  /**
   * Joins the specified path with the base path.
   *
   * @param {string} [path=''] - The path to be joined.
   * @param {string} [base=process.cwd()] - The base path.
   * @returns {string} - The joined path.
   */
  path(path = '', base = process.cwd()) {
    // Use the 'path' module's join function to join the path with the base path
    return require('path').join(base, path);
  }


  /**
  * Creates a writable stream for the specified path.
  *
  * @param {string} [path='./'] - The path for the writable stream.
  * @param {object} [options={ objectMode: true, encoding: 'utf-8', autoDestroy: true }] - The options for the writable stream.
  * @returns {WritableStream} - The writable stream.
  */
  writable(path = this.path('./'), options = { objectMode: true, encoding: 'utf-8', autoDestroy: true }) {
    // Use the 'createWriteStream' function to create a writable stream with the specified path and options
    return createWriteStream(path, options);
  }

  /**
   * Creates a readable stream for the specified path.
   *
   * @param {string} [path='.'] - The path for the readable stream.
   * @param {object} [options={ objectMode: true, encoding: 'utf-8', autoDestroy: true }] - The options for the readable stream.
   * @returns {ReadableStream} - The readable stream.
   */
  readable(path = this.path('.'), options = { objectMode: true, encoding: 'utf-8', autoDestroy: true }) {
    // Use the 'createReadStream' function to create a readable stream with the specified path and options
    return createReadStream(path, options);
  }



  /**
 * Retrieves data from an iterable and returns a readable stream.
 *
 * @param {object|[]} [iterable={}] - The iterable object or array containing the data.
 * @param {object} [options={ objectMode: true, encoding: 'utf-8', autoDestroy: true }] - The options for the readable stream.
 * @returns {ReadableStream} - The readable stream.
 */
  getFromIterable(iterable = {} | [], options = { objectMode: true, encoding: 'utf-8', autoDestroy: true }) {
    // Convert the iterable to a JSON string and use the 'Base.from' method to create a readable stream
    return Base.from(JSON.stringify(iterable), options);
  }


  /**
   * A class method that returns a function for making HTTP GET requests.
   *
   * @param {Function} resolve - The function to call when the request is successful.
   * @param {Function} reject - The function to call when the request encounters an error.
   * @returns {Function} - The function for making HTTP GET requests.
   */
  fns(resolve = () => { }, reject = () => { }) {
    /**
     * The function for making HTTP GET requests.
     *
     * @param {string} protocal - The protocol to use for the request (e.g., 'https').
     * @param {string} url - The URL to make the request to.
     * @param {Function} fn - The function to call after the request is completed.
     * @returns {Function} - The function for setting options and handling the response.
     */
    return (protocal = 'https', url, fn = () => { }) => {
      /**
       * The function for setting options and handling the response.
       *
       * @param {Object} options - The options for the request.
       * @param {Array} data - The array to store response chunks.
       */
      return (options = {}, data = []) => {
        protocal['get'](url, options, response => {
          response.on('data', chunk => {
            data.push(chunk);
          });
          response.on('error', error => {
            reject(error.message || error);
            fn(error.message || error, null, null);
            this.emit('get-error', error);
          });
          response.on('end', () => {
            const responseData = JSON.parse(Buffer.concat(data).toString());
            this.emit('get', responseData);
            resolve(responseData);
            fn(null, responseData, data);
          });
        });
      };
    };
  }


  /**
  * Performs a GET request to the specified URL and retrieves the response data.
  *
  * @param {string} [url='https://jsonplaceholder.typicode.com/comments'] - The URL to perform the GET request.
  * @param {function} [fn=() => {}] - The callback function to be executed during the GET request.
  * @param {object} [options={}] - The options for the GET request.
  * @param {Array} [data=[]] - The array to store the response data chunks.
  * @returns {Promise<object>} - A promise that resolves with the parsed response data.
  */
  async get(url = 'https://jsonplaceholder.typicode.com/comments', fn = () => { }, options = {}, data = []) {
    return new Promise((resolve, reject) => {
      https.get(url, options, response => {
        response.on('data', chunk => {
          data.push(chunk);
        });
        response.on('error', error => {
          reject(error.message || error);
          fn(error.message || error, null, null);
          this.emit('get-error', error);
        });
        response.on('end', () => {
          const responseData = JSON.parse(Buffer.concat(data).toString());
          this.emit('get', responseData);
          resolve(responseData);
          fn(null, responseData, data);
        });
      });
    });

  }


  /**
   * Generates the options object for making HTTP requests.
   *
   * @param {string} url - The URL for the request.
   * @param {string} method - The HTTP method for the request (default: 'POST').
   * @param {number} port - The port for the request (default: 443).
   * @param {Object} headers - The headers for the request (default: {'Content-Type': 'application/json'}).
   * @returns {Object} - The options object.
   */
  options(url, method = 'POST', port = 443, headers = { 'Content-Type': 'application/json' }) {
    const options = new URL(url);
    options.port = port;
    options.method = method;
    options.headers = headers;
    return options;
  }


  /**
   * Performs an API request to the specified URL using the provided options.
   *
   * @param {string} url - The URL to which the API request will be sent.
   * @param {object} options - The options for the API request.
   * @param {function} [fn=() => {}] - The callback function to be executed during the API request.
   * @param {Array} [data=[]] - The array to store the response data chunks.
   * @returns {Promise<object>} - A promise that resolves with the parsed response data.
   */
  async apiRequest(url, options, fn = () => { }, data = []) {
    return new Promise((resolve, reject) => {
      https.request(url, options, response => {
        response.on('data', chunk => {
          data.push(chunk);
        });
        response.on('error', error => {
          this.emit('apiRequest-error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
        response.on('end', () => {
          const responseData = JSON.parse(Buffer.concat(data).toString());
          this.emit('apiRequest', responseData);
          resolve(responseData);
          fn(null, responseData, data);
        });
      });
    });
  }



  /**
   * Sends a POST request to the specified URL with the provided data.
   *
   * @param {string} url - The URL to which the POST request will be sent.
   * @param {object|string} data - The data to be included in the request body.
   * @param {function} [fn=() => {}] - The callback function to be executed during the request.
   * @param {object} [headers={'Content-Type': 'application/json'}] - The headers for the request.
   * @param {string} [datum=''] - The accumulated response data.
   * @returns {Promise<object>} - A promise that resolves with the parsed response data.
   */
  async post(url = '', data = {}, fn = () => { }, headers = { 'Content-Type': 'application/json' }, datum = '') {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      options.port = 443;
      options.method = 'POST';
      options.headers = headers;

      const req = https.request(options, response => {
        response.on('data', chunk => {
          datum += chunk;
        });
        response.on('end', () => {
          const responseData = JSON.parse(datum);
          this.emit('post', responseData);
          resolve(responseData);
          fn(null, responseData, datum);
        });
        response.on('error', error => {
          this.emit('error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
      });
      req.write(JSON.stringify(data));
      req.end();
    });
  }



  /**
   * Sends a PUT request to the specified URL with the provided data.
   *
   * @param {string} url - The URL to which the PUT request will be sent.
   * @param {object|string} data - The data to be included in the request body.
   * @param {function} [fn=() => {}] - The callback function to be executed during the request.
   * @param {object} [headers={'Content-Type': 'application/json'}] - The headers for the request.
   * @param {string} [datum=''] - The accumulated response data.
   * @returns {Promise<object>} - A promise that resolves with the parsed response data.
   */

  async put(url = '', data = {}, fn = () => { }, headers = { 'Content-Type': 'application/json' }, datum = '') {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      options.port = 443;
      options.method = 'PUT';
      options.headers = headers;

      const req = https.request(options, response => {
        response.on('data', chunk => {
          datum += chunk;
        });
        response.on('end', () => {
          const responseData = JSON.parse(datum);
          this.emit('put', responseData);
          resolve(responseData);
          fn(null, responseData, datum);
        });
        response.on('error', error => {
          this.emit('error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
      });

      req.write(JSON.stringify(data));
      req.end();
    });
  }




  /**
   * Sends a DELETE request to the specified URL.
   *
   * @param {string} url - The URL to which the DELETE request will be sent.
   * @param {function} [fn=() => {}] - The callback function to be executed during the request.
   * @param {object} [headers={'Content-Type': 'application/json'}] - The headers for the request.
   * @param {string} [datum=''] - The accumulated response data.
   * @returns {Promise<object>} - A promise that resolves with the parsed response data.
   */
  async delete(url = '', fn = () => { }, headers = { 'Content-Type': 'application/json' }, datum = '') {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      options.port = 443;
      options.method = 'DELETE';
      options.headers = headers;

      const req = https.request(options, response => {
        response.on('data', chunk => {
          datum += chunk;
        });
        response.on('end', () => {
          const responseData = JSON.parse(datum);
          this.emit('delete', responseData);
          resolve(responseData);
          fn(null, responseData, datum);
        });
        response.on('error', error => {
          this.emit('error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, error, null, null);
        });
      });

      req.write(datum);
      req.end();
    });
  }




  /**
  * Sends a GET request to the specified URL.
  *
  * @param {string} url - The URL to which the GET request will be sent.
  * @param {function} [fn=() => {}] - The callback function to be executed during the request.
  * @param {Array} [data=[]] - The accumulated response data.
  * @returns {Promise<object>} - A promise that resolves with the parsed response data.
  */
  async GET(url, fn = () => { }, data = []) {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      options.method = 'GET';

      http.get(url, options, response => {
        response.on('data', chunk => {
          data.push(chunk);
        });
        response.on('error', error => {
          this.emit('GET-error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
        response.on('end', () => {
          const responseData = JSON.parse(Buffer.concat(data).toString());
          this.emit('GET', responseData);
          resolve(responseData);
          fn(null, responseData, data);
        });
      });
    });
  }


  /**
  * Sends an API request using the specified URL and options.
  *
  * @param {string} url - The URL to which the API request will be sent.
  * @param {object} options - The options object for the request.
  * @param {function} [fn=() => {}] - The callback function to be executed during the request.
  * @param {Array} [data=[]] - The accumulated response data.
  * @returns {Promise<object>} - A promise that resolves with the parsed response data.
  */
  async apiREQUEST(url, options, fn = () => { }, data = []) {
    return new Promise((resolve, reject) => {
      http.request(url, options, response => {
        response.on('data', chunk => {
          data.push(chunk);
        });
        response.on('error', error => {
          this.emit('apiREQUEST-error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
        response.on('end', () => {
          const responseData = JSON.parse(Buffer.concat(data).toString());
          this.emit('apiREQUEST', responseData);
          resolve(responseData);
          fn(null, responseData, data);
        });
      });
    });
  }




  /**
  * Sends a POST request to the specified URL with the provided data and options.
  *
  * @param {string} url - The URL to which the POST request will be sent.
  * @param {object} data - The data to be sent with the POST request.
  * @param {function} [fn=() => {}] - The callback function to be executed during the request.
  * @param {object} [headers={'Content-Type': 'application/json'}] - The headers for the request.
  * @param {string} [datum=[]] - The accumulated response data.
  * @returns {Promise<object>} - A promise that resolves with the parsed response data.
  */
  async POST(url = '', data = {}, fn = () => { }, headers = { 'Content-Type': 'application/json' }, datum = []) {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      // options.port = 3000 || port;
      options.method = 'POST';
      options.headers = headers || {}

      const req = http.request(options, response => {
        response.on('data', chunk => {
          datum.push(chunk)
        });
        response.on('end', () => {
          const responseData = JSON.parse(datum);
          this.emit('POST', responseData);
          resolve(responseData);
          fn(null, responseData, datum);
        });
        response.on('error', error => {
          this.emit('error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
      });
      req.write(JSON.stringify(data));
      req.end();
    });
  }


  /**
   * Sends a PUT request to the specified URL with the provided data and options.
   *
   * @param {string} url - The URL to which the PUT request will be sent.
   * @param {object} data - The data to be sent with the PUT request.
   * @param {function} [fn=() => {}] - The callback function to be executed during the request.
   * @param {object} [headers={'Content-Type': 'application/json'}] - The headers for the request.
   * @param {string} [datum=''] - The accumulated response data.
   * @returns {Promise<object>} - A promise that resolves with the parsed response data.
   */
  async PUT(url = '', data = {}, fn = () => { }, headers = { 'Content-Type': 'application/json' }, datum = []) {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      options.method = 'PUT';
      options.headers = headers;

      const req = http.request(options, response => {
        response.on('data', chunk => {
          datum.push(chunk);
        });
        response.on('end', () => {
          const responseData = JSON.parse(datum);
          this.emit('PUT', responseData);
          resolve(responseData);
          fn(null, responseData, datum);
        });
        response.on('error', error => {
          this.emit('error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
      });
      req.write(JSON.stringify(data));
      req.end();
    });
  }





  /**
   * Sends a DELETE request to the specified URL with the provided options.
   *
   * @param {string} url - The URL to which the DELETE request will be sent.
   * @param {function} [fn=() => {}] - The callback function to be executed during the request.
   * @param {object} [headers={'Content-Type': 'application/json'}] - The headers for the request.
   * @param {string} [datum=''] - The accumulated response data.
   * @returns {Promise<object>} - A promise that resolves with the parsed response data.
   */
  async DELETE(url = '', fn = () => { }, headers = { 'Content-Type': 'application/json' }, datum = '') {
    return new Promise((resolve, reject) => {
      const options = new URL(url);
      options.method = 'DELETE';
      options.headers = headers;

      const req = http.request(options, response => {
        response.on('data', chunk => {
          datum += chunk;
        });
        response.on('end', () => {
          const responseData = JSON.parse(datum);
          this.emit('DELETE', responseData);
          resolve(responseData);
          fn(null, responseData, datum);
        });
        response.on('error', error => {
          this.emit('error', error.message || error);
          reject(error.message || error);
          fn(error.message || error, null, null);
        });
      });
      req.write(datum);
      req.end();
    });
  }



  /**
   * Removes duplicate listeners for the specified event.
   *
   * @param {string} event - The event for which duplicate listeners will be removed.
   */
  removeDuplicateListeners(event) {
    if (this.rawListeners(event).length > 1) {
      for (let i = 1; i < this.rawListeners(event).length; i++) {
        this.removeListener(event, this.rawListeners(event)[i]);
      }
    }
  }


  searchFileInDirectory(directoryPath, targetFileName) {
    try {
      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          const foundFilePath = searchFileInDirectory(filePath, targetFileName);
          if (foundFilePath) {
            return foundFilePath; // Return early if file is found
          }
        } else if (file === targetFileName) {
          return filePath; // Return the path of the found file
        }
      }
      return null; // File not found in this directory
    } catch (error) {
      console.error('Error searching for file:', error);
      return null;
    }
  }

  recursivelyCreateFile(filePath) {
    try {
      // Check if the file already exists
      if (fs.existsSync(filePath)) {
        console.log(`File '${filePath}' already exists.`);
        return;
      }

      // Extract the directory path from the file path
      const directoryPath = path.dirname(filePath);

      // Recursively create the parent directories if they don't exist
      recursivelyCreateDirectory(directoryPath);

      // Create the file
      fs.writeFileSync(filePath, '');

      console.log(`File '${filePath}' created.`);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  }

  recursivelyCreateDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
      recursivelyCreateDirectory(path.dirname(directoryPath));
      fs.mkdirSync(directoryPath);
    }
  }

  searchFileInDirectoryStream(directoryPath, targetFileName, callback) {
    const fileStream = new Transform({
      transform(chunk, encoding, done) {
        const fileNames = chunk.toString().split('\n');
        for (const fileName of fileNames) {
          if (fileName === targetFileName) {
            this.push(path.join(directoryPath, fileName));
          }
        }
        done();
      }
    });

    const dirStream = fs.createReadStream(path.join(directoryPath, 'files.txt'));

    dirStream.on('error', (error) => {
      console.error('Error reading directory:', error);
      callback(null);
    });

    fileStream.on('data', (filePath) => {
      callback(filePath);
    });

    fileStream.on('end', () => {
      callback(null); // File not found
    });

    dirStream.pipe(fileStream);
  }


  recursivelyCreateFileStream(filePath, callback) {
    const directoryPath = path.dirname(filePath);

    createDirectoryRecursiveStream(directoryPath, () => {
      const writable = fs.createWriteStream(filePath);

      writable.on('finish', () => {
        callback();
      });

      const readable = Readable.from(['']); // Creating an empty readable stream

      readable.pipe(writable);
    });
  }

  createDirectoryRecursiveStream(directoryPath, callback) {
    if (!fs.existsSync(directoryPath)) {
      createDirectoryRecursiveStream(path.dirname(directoryPath), () => {
        fs.mkdirSync(directoryPath);
        callback();
      });
    } else {
      callback();
    }
  }


  /**
   * Autobinds class methods to the instance of the class.
   *
   * @param {Object} className - The class whose methods will be autobound.
   */
  autobinder(className = {}) {
    for (let method of Object.getOwnPropertyNames(className.prototype)) {
      if (typeof this[method] === "function" && method !== "constructor") {
        this[method] = this[method].bind(this);
      }
    }
  }


  /**
   * Autobinds the autobinder method to the current instance and invokes it with the specified class.
   *
   * @param {Object} className - The class whose methods will be autobound.
   */
  autobind(className = {}) {
    this.autobinder = this.autobinder.bind(this);
    this.autobinder(className);
  }


  /**
   * Methodizes the methods from the specified class(es) by binding them to the current instance.
   *
   * @param {...Object} classNamesList - The classes whose methods will be methodized.
   */
  methodizer(...classNamesList) {
    if (classNamesList.length === 0) return;
    for (let className of classNamesList) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
        if (this[method] === undefined || !this[method]) {
          if (typeof className.prototype[method] === "function") {
            this[method] = className.prototype[method];
            // Auto bind each method from the className class to this
            this[method] = this[method].bind(this);
          }
        }
      }
    }
  }



  /**
   * Methodizes the methods from the specified objects by binding them to the current instance.
   *
   * @param {...Object} objectWithMethodList - The objects containing methods to be methodized.
   */
  methodizeProperty(...objectWithMethodList) {
    if (objectWithMethodList.length === 0) return;
    objectWithMethodList.forEach(objectWithMethod => {
      Object.keys(objectWithMethod).forEach(method => {
        if (!this[method] || this[method] == undefined) {
          this[method] = objectWithMethod[method];
          if (typeof this[method] === 'function') {
            this[method] = this[method].bind(this);
          }
        }
      });
    });
  }


  /**
   * Methodizes the prototype methods from the specified class names by binding them to the current instance.
   *
   * @param {...Function} classNamesList - The class names whose prototype methods to methodize.
   */

  methodizePrototype(...classNamesList) {
    if (classNamesList.length === 0) return;
    for (let className of classNamesList) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
        if (this[method] === undefined || !this[method]) {
          if (typeof className.prototype[method] === 'function') {
            this[method] = className.prototype[method];
            if (typeof this[method] === 'function') {
              this[method] = this[method].bind(this);
            }
          }
        }
      }
    }
  }

  /**
   * Automatically invokes methods from the specified class name on the current instance.
   *
   * @param {Function} className - The class name whose methods to automatically invoke.
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
   * Returns an array of method names that should be automatically invoked by the `autoinvoker` method.
   * Modify this method to specify the method names to be autoinvoked.
   *
   * @returns {Array} - An array of method names.
   */

  autoinvoked() {
    return [""];
  }



  /**
   * @name _transform
   * @function
   *
   * @param {Buffer|String|Any} chunk The Buffer to be transformed, converted from the string passed to stream. write(). * If the stream's decode strings option is false or the stream is operating in object mode,
   * the chunk will not be converted & will be whatever was passed to stream. write().
   *
   * @param {String} encoding If the chunk is a string, then this is the encoding type.
   * If the chunk is a buffer, then this is the special value 'buffer'. Ignore it in that case.
   * @param {Function} fn A callback function (optionally with an error argument and data)
   *  to be called after the supplied chunk has been processed.
   *
   * @description This function MUST NOT be called by application code directly.
   *  It should be implemented by child classes and called by the internal Readable class methods only.
   *
   * @return does not return anything
   *
   */

  _transform(chunk, encoding = "utf-8", fn) {
    this.push(JSON.stringify(chunk));
    fn();
  }

  /**
   * @name _flush
   * @function
   *
   * @param {Function} fn A callback function (optionally with an error argument and data)
   *  to be called after the supplied chunk has been processed.
   *
   * @description This function MUST NOT be called by application code directly.
   *  It should be implemented by child classes and called by the internal Readable class methods only.
   *
   * @return does not return anything
   *
   */

  _flush(fn) {
    fn();
  }

  /**
   * @name _final
   * @function
   *
   * @param {Function} fn A callback function (optionally with an error argument and data)
   *  to be called after the supplied chunk has been processed.
   *
   * @description This function MUST NOT be called by application code directly.
   *  It should be implemented by child classes and called by the internal Readable class methods only.
   *
   * @return does not return anything
   *
   */

  _final(fn) {
    fn();
  }

  /**
       * @name _read
       * @function
       * 
       * @param {Number} size Number of bytes to read asynchronously
       * 
  
   
       * @description This function MUST NOT be called by application code directly. It should be implemented by child classes and called by the internal Readable class methods only.
       * 
       *All Readable stream implementations must provide an implementation of the readable._read() method to fetch data from the underlying resource.
  
      When readable._read() is called, if data is available from the resource, the implementation should begin pushing that data into the read queue using the this.push(data chunk) method. _read() should continue reading from the resource and pushing data until readable.push() returns false. Only when _read() is called again after it has stopped should it resume pushing additional data onto the queue.
      
      Once the readable._read() method has been called, it will not be called again until more data is pushed through the readable.push() method. Empty data such as empty buffers and strings will not cause readable._read() to be called.
  
      The size argument is advisory. For implementations where a "read" is a single operation, returns data can use the size argument to determine how much data to fetch. Other implementations may ignore this argument and simply provide data whenever it becomes available. There is no need to "wait" until size bytes are available before calling stream.push(chunk).
  
      The readable._read() method is prefixed with an underscore because it is internal to the class that defines it, and should never be called directly by user programs.
  
  
      
       * @return does not return anything
       * 
       */

  _read(size) { }



  /**
      * @name _destroy
      * @function
      * 
      * @param {Error} error A possible error..
      * 
 
      * @param {Function} fn  A callback function that takes an optional error  argument.
      * 
      *  to be called after the supplied chunk has been processed.
      * 
      * @description The _destroy() method is called by writable.destroy(). It can be overridden by child classes but it must not be called directly.
      *    
      * @return does not return anything
      * 
      */

  _destroy(error, fn = () => { }) { }
}

module.exports = Base;


