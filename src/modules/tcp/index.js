#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module TCP
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc TCP class
 */


const Server = require('server');
const Client = require('client');
class TCP extends require("./base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });
    
    if(!this.serverPort) this.serverPort = 8000;
    if(!this.serverHost) this.serverHost = '127.0.0.1';

    if(!this.clientPort) this.clientPort = 8080;
    if(!this.clientHost) this.clientHost = '127.0.0.1';

    this.server = new Server({port: this.serverPort, host: this.serverHost})
    this.client = new Client({port: this.clientPort, host: this.clientHost})


    // auto bind methods
    this.autobind(TCP);
    // auto invoke methods
    this.autoinvoker(TCP);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(Server, Client);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
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
      return ["init"];
    }
}

module.exports =  TCP;



