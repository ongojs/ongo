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
 * @module Schema
 * @kind class
 *
 * @extends Schema
 * @requires Schema
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc Schema class
 */

const { createReadStream, createWriteStream, promises } = require("fs");

const { join } = require('node:path');
const { existsSync } = require('fs')

const { exec } = require('node:child_process');
// const schema = require('./lib/schema')
const schema = require('./lib/native')

class Schema extends require("../base") {
  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(Schema);
    // auto invoke methods
    this.autoinvoker(Schema);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
   * Returns an array of supported data types for defining schemas.
   * These data types can be used to specify the types of fields in a schema.
   *
   * @returns {string[]} An array containing the supported data types.
   */
  types() {
    return [
      'double', 'string', 'object', 'array', 'objectId', 'data', 'bool',
      'null', 'regex', 'int', 'timestamp', 'long', 'decimal', 'uuid', 'bindData',
      'mixed'
    ];
  }


  /**
   * Generates a command string based on the input command.
   * If the input command ends with 's', it returns the command string in lowercase.
   * Otherwise, it returns the command string with 's' appended in lowercase.
   *
   * @param {string} cmdCommand - The input command string.
   * @returns {string} The generated command string.
   */
  cmd(cmdCommand = 'User') {
    return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase() : `${cmdCommand}s`.toLowerCase();
  }




  /**
   * Joins the given path with the current working directory.
   * If the path parameter is not provided, it defaults to '/app/schemas'.
   *
   * @param {string} path - The relative path to be joined with the current working directory.
   * @returns {string} The absolute path resulting from the join operation.
   */
  path(path = '/app/schemas') {
    return require('path').join(process.cwd(), path);
  }

  /**
   * Adds a directory at the specified path if it does not already exist.
   *
   * @param {string} path - The absolute path where the directory should be created.
   *                        If not provided, it defaults to the result of calling the `path` function.
   * @returns {Promise<void>} A Promise that resolves when the directory is created or if it already exists.
   *                          The Promise resolves with no value upon successful completion.
   * @throws {Error} If an error occurs during the directory creation process.
   */
  async addDirectory(path = path()) {
    if (!existsSync(path)) {
      await require('fs').promises.mkdir(path, { recursive: true });
    }
  }

  /**
   * Checks for the installation of the '@mongodb-model/db-schema' package in the current project.
   * If the package is not found, it attempts to link it using 'yarn link'.
   * This function uses the 'exec' function from the 'child_process' module to run shell commands.
   * Any error encountered during the process will be logged to the console.
   * If the package is already installed, this function does nothing.
   *
   * @returns {void} This function does not return any value.
   */
  checkForInstallation() {
    const { exec } = require('child_process');

    exec('npm list @mongodb-model/db-schema', (error, stdout, stderr) => {
      if (error) {
        // If '@mongodb-model/db-schema' is not found, attempt to link it using 'yarn link'.
        exec('yarn link @mongodb-model/db-schema', (err, sto, sdi) => {
          if (err) {
            // Log the error to the console if there's an issue linking the package.
            console.error(err);
          }
          if (sto) {
            // Log the output of the 'yarn link' command to the console.
            console.log(sto);
          }
        });
      }
    });
  }

  /**
   * Constructs the absolute file path for a model/schema based on the given command.
   * The command is expected to be in the format 'path/to/model' or 'path/to/schema'.
   * The function extracts the directory path from the command, removes the last segment (model/schema name),
   * and then joins it with the '/app/schemas/' directory to form the absolute model/schema file path.
   *
   * @param {string} command - The command representing the path to the model/schema (e.g., 'path/to/model').
   * @returns {string} The absolute file path of the model/schema.
   */
  modelPath(command) {
    const paths = command.split('/');
    paths.pop(); // Remove the last segment (model/schema name).
    const modelPath = '/app/schemas/' + paths.join('/'); // Construct the absolute file path.
    return this.path(modelPath); // Delegate to the 'path' function to get the full absolute path.
  }

  /**
   * Extracts the model name from the given command and returns it.
   * The command is expected to be in the format 'path/to/model'.
   * The function splits the command by '/' to get the segments and removes the last segment (model name).
   * It then converts the first character of the model name to uppercase and returns it.
   *
   * @param {string} command - The command representing the path to the model (e.g., 'path/to/model').
   * @returns {string} The extracted model name with the first character in uppercase.
   */
  modelName(command) {
    const paths = command.split('/');
    const name = paths.pop(); // Remove the last segment (model name).
    return (name.charAt(0).toUpperCase() + name.slice(1)).split('=')[1];
  }

  /**
   * Extracts the collection name from the given command and returns it.
   * The command is expected to be in the format 'path/to/collection'.
   * The function splits the command by '/' to get the segments and removes the last segment (collection name).
   * It then delegates to the 'cmd' function (expected to be defined elsewhere) to get the collection name.
   *
   * @param {string} command - The command representing the path to the collection (e.g., 'path/to/collection').
   * @returns {string} The extracted collection name obtained by calling the 'cmd' function with the last segment.
   */
  collectionName(command) {
    const paths = command.split('/');
    const name = paths.pop(); // Remove the last segment (collection name).
    return this.cmd(name); // Delegate to the 'cmd' function to get the collection name.
  }

  /**
   * Checks if the given type is valid, considering the available data types (this.types()).
   * The function validates the type string based on specific conditions and returns a boolean value.
   * If the type starts with '--type=', it checks if the value after the equal sign is present in the list of valid types.
   *
   * @param {string} type - The type to validate (e.g., 'object', '--type=array').
   * @returns {boolean} True if the type is valid, otherwise false.
   */
  hasType(type = 'object') {
    if (type && typeof type === 'string' && type.trim().length !== 0) {
      if (type.startsWith('--type=')) {
        return this.types().includes(type.split('=')[1]);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }





  /**
   * Returns the data type to be used for schema creation based on the given type.
   * The function first checks if the provided type is valid using the 'hasType' function.
   * If the type is valid and starts with '--type=', it extracts the actual type value after the equal sign.
   * If the type is not valid or not provided, it returns 'object' as the default schema type.
   *
   * @param {string} type - The type string (e.g., '--type=array').
   * @returns {string} The extracted schema data type or 'object' if the type is not valid or not provided.
   */
  schemaType(type = '--type=object') {
    return this.hasType(type) ? type.split('=')[1] : 'object';
  }


  /**
   * Creates a new schema file for a model/collection based on the provided command and schema type.
   * If the command starts with '--schema=', it extracts the actual command after the equal sign.
   * The function checks if the given schema type is valid using the 'hasType' function.
   * It then proceeds to check for the installation of a specific dependency and creates the necessary directory.
   * If the model name is not provided or undefined, it generates the schema file based on the provided command.
   * If the model name is provided, it generates the schema file using the extracted model name.
   *
   * @param {string} command - The command representing the path to the model/collection or schema (e.g., 'path/to/model' or '--schema=path/to/schema').
   * @param {string} type - The schema type (e.g., 'object', '--type=array'). Defaults to 'object'.
   * @returns {void} The function does not return anything. It creates the schema file and prints the result to the console.
   */
  async makeSchema(command, type = 'object') {
    // Extract the actual command after '--schema=' if present.
    if (command.startsWith('--schema=')) {
      command = command.split('--schema=')[1];
    }

    // Check if the provided schema type is valid using the 'hasType' function.
    if (this.hasType) {
      // Check for installation and create the necessary directory using 'addDirectory' function.
      this.checkForInstallation();
      await this.addDirectory(this.modelPath(command));

      // Check if the model name is not provided or undefined.
      if (!this.modelName(command) || this.modelName(command) === undefined) {
        if (command && command.split('/').length == 1) {
          // Generate the schema file based on the provided command (model name).
          if (!existsSync(join(this.modelPath(command), `${command}.js`))) {
            const writable = this.createWriteStream(join(this.modelPath(command), `${command}.js`));
            writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
            writable.end('');
            console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
          } else {
            console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
          }
        } else {
          // Generate the schema file based on the last segment of the provided command (model name).
          if (!existsSync(join(this.modelPath(command), `${command.split('/').pop()}.js`))) {
            const writable = this.createWriteStream(join(this.modelPath(command), `${command.split('/').pop()}.js`));
            writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
            writable.end('');
            console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
          } else {
            console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
          }
        }
      } else {
        // Generate the schema file based on the extracted model name.
        if (!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
          const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
          writable.write(schema({ name: this.cmd(this.modelName(command)), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(this.modelName(command))} schema successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(this.modelName(command))}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        }
      }
    } else {
      // If the 'hasType' function is not available, return an error message.
      return console.log('command make:schema', command);
    }
  }


  /**
   * Creates a new schema file for a model/collection based on the provided command and schema type.
   * If the command starts with '--schema=', it extracts the actual command after the equal sign.
   * The function checks if the 'hasType' function is available.
   * If available, it proceeds to check for the installation of a specific dependency and creates the necessary directory.
   * If the model name is not provided or undefined, it generates the schema file based on the provided command.
   * If the model name is provided, it generates the schema file using the extracted model name.
   *
   * @param {string} command - The command representing the path to the model/collection or schema (e.g., 'path/to/model' or '--schema=path/to/schema').
   * @param {string} type - The schema type (e.g., 'object', '--type=array'). Defaults to 'object'.
   * @returns {void} The function does not return anything. It creates the schema file and prints the result to the console.
   */
  async makeSchema(command, type = 'object') {
    // Extract the actual command after '--schema=' if present.
    if (command.startsWith('--schema=')) {
      command = command.split('--schema=')[1];
    }

    // Check if the 'hasType' function is available.
    if (this.hasType) {
      // Check for installation and create the necessary directory using 'addDirectory' function.
      this.checkForInstallation();
      await this.addDirectory(this.modelPath(command));

      // Check if the model name is not provided or undefined.
      if (!this.modelName(command) || this.modelName(command) === undefined) {
        if (command && command.split('/').length == 1) {
          // Generate the schema file based on the provided command (model name).
          if (!existsSync(join(this.modelPath(command), `${command}.js`))) {
            const writable = this.createWriteStream(join(this.modelPath(command), `${command}.js`));
            writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
            writable.end('');
            console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
          } else {
            console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
          }
        } else {
          // Generate the schema file based on the last segment of the provided command (model name).
          if (!existsSync(join(this.modelPath(command), `${command.split('/').pop()}.js`))) {
            const writable = this.createWriteStream(join(this.modelPath(command), `${command.split('/').pop()}.js`));
            writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
            writable.end('');
            console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
          } else {
            console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
          }
        }
      } else {
        // Generate the schema file based on the extracted model name.
        if (!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
          const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
          writable.write(schema({ name: this.cmd(this.modelName(command)), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(this.modelName(command))} schema successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(this.modelName(command))}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        }
      }
    } else {
      // If the 'hasType' function is not available, return an error message.
      return console.log('command make:schema', command);
    }
  }


  /**
   * Creates a new native schema file for a model/collection based on the provided command and schema type.
   * If the command starts with '--schema=', it extracts the actual command after the equal sign.
   * The function checks if the 'hasType' function is available.
   * If available, it proceeds to check for the installation of a specific dependency and creates the necessary directory.
   * If the model name is not provided or undefined, it generates the schema file based on the provided command.
   * If the model name is provided, it generates the schema file using the extracted model name.
   *
   * @param {string} command - The command representing the path to the model/collection or schema (e.g., 'path/to/model' or '--schema=path/to/schema').
   * @param {string} type - The schema type (e.g., 'object', '--type=array'). Defaults to 'object'.
   * @returns {void} The function does not return anything. It creates the schema file and prints the result to the console.
   */
  async makeNativeSchema(command, type = 'object') {
    // Extract the actual command after '--schema=' if present.
    if (command.startsWith('--schema=')) {
      command = command.split('--schema=')[1];
    }

    // Check if the 'hasType' function is available.
    if (this.hasType) {
      // Check for installation and create the necessary directory using 'addDirectory' function.
      this.checkForInstallation();
      await this.addDirectory(this.modelPath(command));

      // Check if the model name is not provided or undefined.
      if (!this.modelName(command) || this.modelName(command) === undefined) {
        if (command && command.split('/').length == 1) {
          // Generate the schema file based on the provided command (model name).
          if (!existsSync(join(this.modelPath(command), `${command}.js`))) {
            const writable = this.createWriteStream(join(this.modelPath(command), `${command}.js`));
            writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
            writable.end('');
            console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
          } else {
            console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
          }
        } else {
          // Generate the schema file based on the last segment of the provided command (model name).
          if (!existsSync(join(this.modelPath(command), `${command.split('/').pop()}.js`))) {
            const writable = this.createWriteStream(join(this.modelPath(command), `${command.split('/').pop()}.js`));
            writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
            writable.end('');
            console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
          } else {
            console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
          }
        }
      } else {
        // Generate the schema file based on the extracted model name.
        if (!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
          const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
          writable.write(schema({ name: this.cmd(this.modelName(command)), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(this.modelName(command))} schema successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(this.modelName(command))}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        }
      }
    } else {
      // If the 'hasType' function is not available, return an error message.
      return console.log('command make:schema', command);
    }
  }


  /**
   * Creates a new migration file for a model/collection based on the provided command and schema type.
   * The function checks if the 'hasType' function is available.
   * If available and the model name is not undefined, it proceeds to check for the installation of a specific dependency
   * and creates the necessary directory for the migration.
   * If the migration file with the same model name already exists, it logs a message indicating that the migration file already exists.
   * If the model name is undefined or the 'hasType' function is not available, it logs an error message.
   *
   * @param {string} command - The command representing the path to the model/collection (e.g., 'path/to/model').
   * @param {string} type - The schema type (e.g., 'object', '--type=array'). Defaults to 'object'.
   * @returns {void} The function does not return anything. It creates the migration file and prints the result to the console.
   */
  async migrate(command, type = 'object') {
    if (this.hasType) {
      // Check if the model name is not undefined.
      if (this.modelName(command) !== undefined) {
        // Check for installation and create the necessary directory for the migration.
        this.checkForInstallation();
        await this.addDirectory(this.modelPath(command));

        // Check if the migration file with the same model name already exists.
        if (existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
          console.log(`\x1b[32m${this.modelName(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        } else {
          // Create the migration file with the model name and provided schema type.
          const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
          writable.write(schema({ name: this.cmd(this.modelName(command)), type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.modelName(command)} schema successfully created!\x1b[0m`);
        }
      }
    } else {
      // If the 'hasType' function is not available or the model name is undefined, return an error message.
      return console.log('command make:schema', command);
    }
  }


  /**
   * Adds default methods and properties to the current context if they are not already defined.
   * If the 'createWriteStream', 'createReadStream', or 'promises' methods are not available in the current context,
   * this function assigns them from their respective modules ('createWriteStream' from 'fs', 'createReadStream' from 'fs', and 'promises' from 'fs').
   *
   * @returns {void} The function does not return anything. It adds the default methods and properties to the current context.
   */
  addDefault() {
    // Check if the 'createWriteStream' method is not available in the current context and assign it from the 'fs' module.
    if (!this.createWriteStream) this.createWriteStream = createWriteStream;

    // Check if the 'createReadStream' method is not available in the current context and assign it from the 'fs' module.
    if (!this.createReadStream) this.createReadStream = createReadStream;

    // Check if the 'promises' property is not available in the current context and assign it from the 'fs' module.
    if (!promises) this.promises = promises;
  }

  /**
  * Automatically invokes the functions listed in the returned array.
  * In this case, the function returns an array with a single element "addDefault".
  * When this function is called, it will automatically invoke the "addDefault" function.
  *
  * @returns {string[]} An array containing the names of the functions to be automatically invoked.
  * In this case, it contains only one element - "addDefault".
  */
  autoinvoked() {
    // Returns an array with a single element "addDefault".
    return ["addDefault"];
  }


}

module.exports = Schema;

