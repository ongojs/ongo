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


const Migration = require('../');

class CLI extends require("../../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
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
   * Execute different commands based on the specified command-line arguments.
   *
   * @function commands
   */
  commands() {
    switch (this.command(2)) {
      case "make":
        // Check if the "make" command has an additional argument (migration name).
        if (this.command(3)) {
          // Destructure the "makeMigration" and "hasType" functions from the Migration class instance.
          const { makeMigration, hasType } = new Migration({ command: this.command(2) });

          // Check if there is an additional argument for the type of migration.
          if (this.command(4)) {
            // Check if the provided migration type is valid using the "hasType" function.
            if (hasType(this.command(4))) {
              // Create the migration using the specified name and type.
              makeMigration(this.command(3), this.command(4));
            } else {
              console.log(`invalid argument for make:migration ${this.command(3)}`);
            }
          } else {
            // Create the migration using only the specified name.
            makeMigration(this.command(3));
          }
        } else {
          console.log('make:migration command requires a migration name.');
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