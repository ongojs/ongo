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

const Migrate = require('../');
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
 * Retrieves the command-line argument at the specified index from the Node.js process.argv array.
 *
 * @param {number} [index=2] - The index of the command-line argument to retrieve. Defaults to 2.
 * @returns {string | undefined} The command-line argument at the specified index, or undefined if not found.
 */
command(index = 2) {
  /**
   * Retrieves the command-line argument at the specified index from the Node.js process.argv array.
   *
   * @param {number} [index=2] - The index of the command-line argument to retrieve. Defaults to 2.
   * @returns {string | undefined} The command-line argument at the specified index, or undefined if not found.
   */
  return process.argv[index];
}

/**
 * Processes commands and performs specific actions based on the command provided in the command-line arguments.
 * The function uses the 'command' method to retrieve the command from the process.argv array.
 */
commands() {
  /**
   * Processes commands and performs specific actions based on the command provided in the command-line arguments.
   * The function uses the 'command' method to retrieve the command from the process.argv array.
   */

  switch (this.command(2)) {
    case "migrate":
      // If the command is 'migrate', create instances of 'Migrate', and execute migration related actions.
      const { migrate, migrateSchema, migrateMigration, migrateAll } = new Migrate({
        command: this.command(2),
      });

      if (this.command(3)) {
        // Check if an additional argument (third command-line argument) is provided.
        if (this.command(3).startsWith('--schema=')) {
          // If the additional argument starts with '--schema=', perform schema migration actions.
          migrateSchema(this.command(3));
          migrateMigration(this.command(3));
        } else {
          console.log(`invalid argument. Must be like --schema=<Schema Name>`);
        }
      } else {
        // If no additional argument is provided, perform all migrations.
        migrateAll(this.command(2));
      }
      break;
    case "man":
      console.log('make man page'); // Placeholder for the 'man' command action.
      break;
    case "help":
      console.log("help man page"); // Placeholder for the 'help' command action.
      break;
    default:
      console.log("invalid command ..."); // If the command does not match any of the cases.
      break;
  }
}


/**
 * Initializes the application by executing the 'commands' function.
 */
init() {
  /**
   * Initializes the application by executing the 'commands' function.
   */
  this.commands();
}



/**
 * An auto-invoked function that returns an array containing the string "init".
 *
 * @returns {string[]} An array containing the string "init".
 */
autoinvoked() {
  /**
   * An auto-invoked function that returns an array containing the string "init".
   *
   * @returns {string[]} An array containing the string "init".
   */
  return ["init"];
}


}

module.exports = new CLI;