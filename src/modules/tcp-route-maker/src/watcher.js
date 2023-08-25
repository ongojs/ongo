"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Watcher
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Watcher class
 */


class Watcher extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
          Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Watcher);
    // auto invoke methods
    this.autoinvoker(Watcher);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

 watchedFileObject(fileObject){
    console.log(fileObject)
 }

  async watch(path =  __filename, options = {persistent: true, recursive: true, encoding: 'utf-8'}){
    try {
        const watcher = require('fs/promises').watch(path, {persistent:true});
        for await (const event of watcher){
          this.watchedFileObject(event)
        }
         
      } catch (err) {
        if (err)
          return;
        throw err;
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
        return [];
      }

 

}

module.exports = Watcher;
