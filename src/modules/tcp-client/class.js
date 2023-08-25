#!/usr/bin/env node

"use strict";

/**
 * @author Afros In Tech <afrosintech@gmail.com> <https://github.com/afrosintech>  <+1.385.204.5167>
 *
 * @module Entry
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Entry class */


class Entry extends require("./base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Entry);
    // auto invoke methods
    this.autoinvoker(Entry);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
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
      return [];
    }

}

module.exports = Entry;