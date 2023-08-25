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


const Man = require("../modules/man");
const Couleur = require("../modules/couleurs");
const Schema = require("../modules/schema");
const Migrate = require("../modules/db-migrate");
const Migration = require("../modules/db-migration");
const ModelCli =  require('../modules/cli/modules/model')
// const Method = require("method");

const {ModelCommand} = require('../lib')().Commands()
/**
 * Represents a CLI class that extends the Base class.
 */
class CLI extends require("../modules/base") {
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


/**
 * Displays an error notification for an invalid command.
 *
 * @param {string} command - The invalid command.
 */
errorNotification(command) {
  let ls;

  if (command !== undefined) {
    if (command.length > 18) {
      ls = spawn("echo", [
        "",
        `\x1b[5m\x1b[31m '${command.slice(0, 18)}...' is not a valid command.\x1b[0m\x1b[0m`
      ]);
    } else {
      ls = spawn("echo", [
        "",
        `\x1b[5m\x1b[31m '${command.slice(0, 18)}' is not a valid command.\x1b[0m\x1b[0m`
      ]);
    }
    ls.stdout.on("data", (data) => {
      if (command !== undefined) {
        console.log(this.invalidCommand(data));
      }
      console.log();
      console.log(`Some Available Options:
          man - for the man page.
          methods - for available method lists.
          help - for the help page.
          events - for available events.
          database - for connected database.
          model - for available models or collections.
          class - for main class.
      `);
    });

    ls.stderr.on("data", (data) => {});

    ls.on("close", (code) => {});
  } else {
    console.log(`Some Available Options:
          man - for the man page.
          methods - for available method lists.
          help - for the help page.
          events - for available events.
          database - for connected database.
          model - for available models or collections.
          class - for main class.
    `);
  }
}

/**
 * The `errorNotification()` function displays an error notification for an invalid command.
 * It accepts a parameter `command` which represents the invalid command.
 * Customize the logic and displayed messages based on your specific requirements.
 */

 commands(){

  // const {BIRed} = new Couleur
  if(!this.command(2) || this.command(2).trim().length === 0){
    new Man({ command: this.command(2) }).man("man");
  }else{
    switch (this.command(2)) {
      case "h":
        new Man({ command: this.command(2) }).man("man");
        break;
      case "help":
       
        new Man({ command: this.command(2) }).man("man");
        break;
      case "--help":
  
        new Man({ command: this.command(2) }).man("man");
        break;
      case "cli":
         new ModelCli()
        break;
      case "-h":
        new Man({ command: this.command(2) }).man("man");
        break;
      case "man":

        new Man({ command: this.command(2) }).man("man");
        break;
      case "--man":
        new Man({ command: this.commands(2) }).man("man");
        break;
      // case "method":
      //   new MethodCommand().method()
      //   break;
      case "models":
        //console.log('models')
        new ModelCommand().list()
        break;
      case "make:model":

       const {makeModel} = new ModelCommand
        makeModel();
        // console.log('make:model', makeModel);
        break;
      case "make:schema":
        // console.log('make:schma')
          const  {makeSchema, hasType} =  new Schema({command: this.command(2)})
          if(this.command(4)){
              if(hasType(this.command(4))){
                makeSchema(this.command(3), this.command(4));
              }else{
                console.log(`invalid argument for make:schema ${this.command(3)}`);
              }
            
          }else{
            makeSchema(this.command(3));
          }
      
        break;
      case "make:migration":
        //console.log('make migration')
        //new MigrationCommand().makeMigration()
        if(this.command(3)){
          const  {makeMigration, hasType} =  new Migration({command: this.command(2)})
          if(this.command(4)){
              if(hasType(this.command(4))){
                makeMigration(this.command(3), this.command(4));
              }else{
                console.log(`invalid argument for make:migration ${this.command(3)}`);
              }
          }else{
            makeMigration(this.command(3));
          }
         }else{
          console.log('make:migration command adfdasf', this.command(3));
         }
        break;
      // case "migrate":

      // console.log('migrate')
      //   //new MigrateCommand().migrate();
      //   break;
      case "migrate":
        const {migrate, migrateSchema, migrateMigration, migrateAll} = new Migrate({command: this.command(2)})
          if(this.command(3)){
            if(this.command(3).startsWith('--schema=')){
              migrateSchema(this.command(3))
              migrateMigration(this.command(3))
            }else{
              console.log(`invalid argument. Must be like --schema=<Schema Name>`);
            }
          }else{
            migrateAll(this.command(2))
          }
        break;
      case "--model=":
          console.log('--model=')
        break;
      case "-M":
          console.log('-M')
        break;
      default:
        console.log('detaults')
        // new Man({ command: this.commands(2) }).man("man");
        //console.log(BIRed(`${this.commands(2)} is not command`));
        break;
    }
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



