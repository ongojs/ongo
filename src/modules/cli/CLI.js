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

const { Interface } = require("readline");

const { createReadStream, createWriteStream, promises } = require("fs");

const https = require('https');
const http = require('http');
const { io } = require('socket.io-client');
const { URL } = require('url');


const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const cmd = require('./modules/cmd')();

class CLI extends Interface {
    constructor(...arrayOfObjects) {
        super({
            input: process.stdin,
            output: process.stdout,
            prompt: ``,
            historySize: 1000,
            crlfDelay: Infinity,
            removeHistoryDuplicates: false,
            escapeCodeTimeout: 500,
            completer: line => {
                const completions = ['help', 'list', 'create', 'delete', 'exit'];
                const hits = completions.filter((c) => c.startsWith(line));
                return [hits.length ? hits : completions, line];
            },
            terminal: true,
        });

        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
              Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
            }
          });

        // Auto bind methods of the base class
        this.autobind(CLI);

        // Auto invoke methods of the base class
        this.autoinvoker(CLI);

        // Add methods from other classes if they do not already exist
        // Example: this.methodizer(...classList);

        // Set the maximum number of event listeners to infinity
        this.setMaxListeners(Infinity);

        this.isLoggedIn = false;
        this.getAuth = null;
    }

    get auth() {
        return this.isLoggedIn;
    }
    get getAuthUser() {
        return this.getAuth;
    }
    set auth(bool = false) {
        this.isLoggedIn = bool;
    }

    set getAuthUser(user = null) {
        this.getAuth = user;
    }

    eventList() {
        return [
            'model',
            'method',
            "man",
            "clear",
            "help",
            "exit",
            "quit",
            "leave",
            "admin",
            "login",
            "logout",
            "frontend"
        ];
    }

    // main (string)  {
    //     string =
    //         typeof string === "string" && string.trim().length > 0
    //             ? string.trim()
    //             : false;
    //     if (string) {
    //         let commandEvent = false;
    //         let event = this.eventList().find(
    //             (event) =>
    //                 string.trim().toLowerCase().indexOf(event) > -1 &&
    //                 string.startsWith(event)
    //         );

    //         if (event) {
    //             commandEvent = true;

    //             this.emit(event, string);
    //             return true;
    //         }
    //         if (commandEvent === false) {
    //             this.removeDuplicateListeners("command-not-found");
    //             return this.emit("command-not-found", {
    //                 error: `'${string}' is not command`,
    //             });
    //         }
    //     } else {
    //         return;
    //     }
    // }

    // common () {
    //     this.on("clear", () => {
    //         console.clear();
    //     });
    //     this.on("exit", () => {
    //         this.close();
    //     });
    //     this.on("leave", () => {
    //         this.close();
    //     });
    //     this.on("quit", () => {
    //         this.close();
    //     });
    //     this.on('home', () => {
    //         console.log('Welcom Home',)
    //     })
    // }

 
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
    
        // init(){
        //     cmd.initObservable(this)
        // }
        // invalidCommand(){
        //     cmd.invalidCommand(this)
        // }
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
       
        common(){
            cmd.common(this)
        }
        invalidCommand(){
           cmd.invalidCommand(this)
        }

        // init(){
        //     //cmd.initObservable(this)
        // }
         
           /**
             * Returns an array of method names that should be automatically invoked by the `autoinvoker` method.
             * Modify this method to specify the method names to be autoinvoked.
             *
             * @returns {Array} - An array of method names.
             */
        
           autoinvoked() {
            return ["common", "invalidCommand"];
        }
}

module.exports = CLI;

// new CLI();



