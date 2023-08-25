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


const Schema = require('../');

class CLI extends require("../../base") {

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
   * Get the command-line argument at the specified index.
   *
   * @function command
   * @param {number} [index=2] - The index of the command-line argument to retrieve.
   * @returns {string} The command-line argument at the specified index.
   */
  command(index = 2) {
    // Retrieve the command-line argument at the specified index using process.argv.
    // If the index is not provided, default to index 2 (the third command-line argument).
    return process.argv[index];
  }

/**
 * Executes different commands based on the arguments provided.
 * It processes the command-line arguments and performs specific actions accordingly.
 * Supported commands:
 * 1. "make": Creates a new schema based on the provided schema name and type.
 * 2. "man": Displays the manual page (documentation) for the application.
 * 3. "help": Displays the help man page.
 * If an invalid or unsupported command is provided, it logs "invalid command ...".
 *
 * The "make" command allows creating a new schema using the "makeSchema" function from the "Schema" module.
 * The "hasType" function from the "Schema" module is used to check the validity of the provided schema type.
 *
 * @returns {void} No return value. The function performs specific actions based on the provided command.
 */
commands() {
  switch (this.command(2)) {
    case "make":
      if (this.command(3)) {
        const { makeSchema, hasType } = new Schema({ command: this.command(2) });

        if (this.command(4)) {
          if (hasType(this.command(4))) {
            makeSchema(this.command(3), this.command(4));
          } else {
            console.log(`invalid argument for make:schema ${this.command(3)}`);
          }
        } else {
          makeSchema(this.command(3));
        }
      } else {
        console.log('make:schema command');
      }
      break;

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
   * Initialize the application by executing the commands.
   *
   * @function init
   */
  init() {
    // Call the "commands" function to handle different commands based on the command-line arguments.
    this.commands();
  }

  /**
   * Get the list of auto-invoked functions.
   *
   * @function autoinvoked
   * @returns {Array} An array containing the names of auto-invoked functions.
   */
  autoinvoked() {
    // Return an array containing the name of the function "init".
    return ["init"];
  }

}

module.exports = new CLI;