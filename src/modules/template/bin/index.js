#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc CLI class
 */



class CLI extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(CLI);
    // auto invoke methods
    this.autoinvoker(CLI);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    
    this.setMaxListeners(Infinity);
  }
/**
 * Retrieves a command-line argument from the process.argv array based on the specified index.
 *
 * @function command
 * @param {number} [index=2] - The index of the command-line argument to retrieve.
 * @returns {string} The command-line argument at the specified index.
 */
command(index = 2) {
  return process.argv[index];
}

/**
 * Executes different commands based on the value of the command-line argument at index 2.
 *
 * @function commands
 * @returns {void} This function does not return any value; it logs the output to the console.
 */
commands() {
  switch (this.command(2)) {
    case "man":
      console.log('make man page');
      break;
    case "help":
      console.log("help man page");
      break;
    default: 
      console.log("invalid command ...");
      break;
  }
}


/**
 * Initializes the CLI application by executing the commands function.
 *
 * @function init
 * @returns {void} This function does not return any value; it executes other functions.
 */
init() {
  this.commands();
}

/**
 * Returns an empty array.
 *
 * @function autoinvoked
 * @returns {Array} An empty array.
 */
autoinvoked() {
  return [];
}

}

module.exports = new CLI;