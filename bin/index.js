#!/usr/bin/env node
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


// const Man = require("../src/modules/man");
// const Couleur = require("../src/modules/couleurs");
// const Schema = require("../src/modules/database/schema");
// const Migrate = require("../src/modules/database/db-migrate");
// const Migration = require("../src/modules/database/db-migration");
// const ModelCli =  require('../src/modules/cli/modules/model')
// const Method = require("method");


const HTTPControllerModule = require('./modules/controllers/http')
const TCPControllerModule = require('./modules/controllers/tcp')
const HTTPRouteMakerModule = require('./modules/routes/http/route-maker')
const TCPRouteMakerModule = require('./modules/routes/tcp/route-maker')
const ModelCliModule = require('./modules/model');
// const {ModelCommand} = require('../lib')().Commands()
/**
 * Represents a CLI class that extends the Base class.
 */
class CLI extends require("../src/modules/base") {
  /**
   * Constructs a new instance of the CLI class.
   *
   * @param {...Object} arrayOfObjects - Additional objects containing options to be assigned to the CLI class.
   */
  constructor(...arrayOfObjects) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    // Assign additional options to the CLI class
    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          if (!this[key]) this[key] = option[key];
        });
      }
    });

    // Auto bind methods of the CLI class
    this.autobind(CLI);

    // Auto invoke methods of the CLI class
    this.autoinvoker(CLI);

    // Add methods from other classes if they do not already exist
    // Example: this.methodizer(...classList);

    // Set the maximum number of event listeners to infinity
    this.setMaxListeners(Infinity);
  }


  /**
   * The CLI class represents a Command Line Interface (CLI) class that extends the Base class.
   * It provides a convenient way to create a CLI class instance with custom options and functionality.
   * The class accepts additional objects containing options to be assigned to the CLI class.
   * Customize the options and functionality based on your specific requirements.
   */



  /**
   * Retrieves the command-line argument at the specified index.
   *
   * @param {number} index - The index of the command-line argument to retrieve. Defaults to 2.
   * @returns {string} The command-line argument value.
   */
  command(index = 2) {
    return process.argv[index];
  }

  /**
   * The `command()` function is used to retrieve the command-line argument at the specified index.
   * It accepts an optional parameter `index` which indicates the index of the command-line argument to retrieve.
   * If no `index` is provided, it defaults to 2.
   * The function returns the value of the command-line argument at the specified index.
   * Customize the index value based on your specific requirements.
   */


  /**
   * Generates a formatted string for an invalid command.
   *
   * @param {string} command - The invalid command.
   * @returns {string} A formatted string representing the invalid command.
   */
  invalidCommand(command = "command") {
    return `
  ----------------------------------------------------

  |${command}
  ----------------------------------------------------`;
  }

  /**
   * The `invalidCommand()` function is used to generate a formatted string for an invalid command.
   * It accepts a parameter `command` which represents the invalid command.
   * The function returns a formatted string representing the invalid command.
   * Customize the `command` parameter based on your specific requirements.
   */



  commands() {
    switch (this.command(2)) {
      case "make":
        HTTPControllerModule(this.command);
        HTTPRouteMakerModule(this.command);
        TCPControllerModule(this.command);
        TCPRouteMakerModule(this.command);
        ModelCliModule (this.command);
        break;
      default:
        console.log("invalid command ...");
        break;
    }
  }
  /**
   * Initializes the class by calling the 'commands' method.
   */
  init() {
    this.commands();
  }

  /**
   * Provides an array of method names to be automatically invoked when the class is instantiated.
   *
   * @returns {Array} An array of method names to be auto-invoked.
   */
  autoinvoked() {
    return ["init"];
  }
}

module.exports = new CLI;



