#!/usr/bin/env node

"use strict";

/**
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module Config
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Config class
 */

const {join} = require('path');

const env = require(join(process.cwd(),'./.env'))
class Config extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Config);
    // auto invoke methods
    this.autoinvoker(Config);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
   /**
   * @name addvariables
   * @function
   *
   *
   * @description add custom environmental objects to NodeJs global process.env object
   *
   * @return does not return anything
   *
   */
    async addvariables() {
      if(env && typeof(env) ==='function'){
        for (let prop in env()) {
          if (!process.env[prop]) {
            if (typeof env()[prop] === "string") {
              process.env[prop] = env()[prop];
            }else if(typeof env()[prop] === "object")
              process.env[prop] = `[${env()[prop].toString()}]`;
          }
        }
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
      return ["addvariables"];
    }
}

module.exports =  Config;


