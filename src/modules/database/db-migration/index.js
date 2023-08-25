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
 * @module Migration
 * @kind class
 *
 * @extends Migration
 * @requires Migration
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc Migration class
 */

const { createReadStream, createWriteStream, promises } = require("fs");

const {join } = require('node:path');
const {existsSync} = require('fs')

const { exec } = require('node:child_process');
// const schema = require('./lib/schema')
const schema = require('./lib/native')

class Migration extends require("../base") {
  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Migration);
    // auto invoke methods
    this.autoinvoker(Migration);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

/**
 * Returns an array of supported data types.
 *
 * @function types
 * @returns {string[]} An array of supported data types.
 */
types() {
  return [
    'double', 'string', 'object', 'array', 'objectId', 'data', 'bool',
    'null', 'regex', 'int', 'timestamp', 'long', 'decimal', 'uuid', 'bindData',
    'mixed'
  ];
}

async addDirectory (path = this.path()) {
  if(!existsSync(path)){
    await require('fs').promises.mkdir(path, {recursive: true});
  }
  if(!existsSync(this.path('/app/schemas'))){
    await require('fs').promises.mkdir(this.path('/app/schemas'), {recursive: true});
  }
  if(!existsSync(this.path('/database/migrations'))){
    await require('fs').promises.mkdir(this.path('/database/migrations'), {recursive: true});
  }
}

/**
 * Generate the command name based on the input command string.
 *
 * @function cmd
 * @param {string} cmdCommand - The input command string.
 * @returns {string} The generated command name.
 */
cmd(cmdCommand = 'User') {
  /**
   * Check if the input command string ends with 's'.
   * If it does, return the command string in lowercase.
   * If it does not, append 's' to the command string and return it in lowercase.
   */
  return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase() : `${cmdCommand}s`.toLowerCase();
}



/**
 * Join the given path with the current working directory.
 *
 * @function path
 * @param {string} path - The path to be joined with the current working directory. Default is '/database/migrations'.
 * @returns {string} The absolute path after joining with the current working directory.
 */
path(path = '/database/migrations') {
  // Join the provided path with the current working directory using the 'join' method from the 'path' module.
  return require('path').join(process.cwd(), path);
}

/**
 * Check if the package "@mongodb-model/db-schema" is installed locally, and install it using "yarn link" if not found.
 *
 * @function checkForInstallation
 */
checkForInstallation() {
  // Execute the command "npm list @mongodb-model/db-schema" to check if the package is installed.
  exec('npm list @mongodb-model/db-schema', (error, stdout, stderr) => {
    // If an error occurs during the execution of the command, try installing the package using "yarn link".
    if (error) {
      exec('yarn link @mongodb-model/db-schema', (err, sto, sdi) => {
        // If an error occurs during the installation, return the error.
        if (err) return error;
        // If the package is installed successfully using "yarn link", log the output (if any) to the console.
        if (sto) {
          console.log(sto);
        }
      });
    }
  });
}

/**
 * Get the file path for the model based on the command.
 *
 * @function modelPath
 * @param {string} command - The command that contains the path to the model file.
 * @returns {string} - The file path for the model.
 */
modelPath(command) {
  // Split the command into individual path segments.
  const paths = command.split('/');
  // Remove the last segment (the model file) from the paths array.
  paths.pop();
  // Join the remaining path segments back together and prepend it with "/database/migrations/" to get the model path.
  const modelPath = '/database/migrations/' + paths.join('/');
  // Return the full file path for the model.
  return this.path(modelPath);
}

/**
 * Extract and format the model name from the command.
 *
 * @function modelName
 * @param {string} command - The command that contains the model name.
 * @returns {string} - The formatted model name.
 */
modelName(command) {
  // Split the command into individual path segments.
  const paths = command.split('/');
  // Pop the last segment (the model file) and store it in the 'name' variable.
  const name = paths.pop();
  // Extract the model name from the 'name' variable and capitalize its first letter.
  const formattedName = (name.charAt(0).toUpperCase() + name.slice(1)).split('=')[1];
  // Return the formatted model name.
  return formattedName;
}

/**
 * Extract and format the collection name from the command.
 *
 * @function collectionName
 * @param {string} command - The command that contains the collection name.
 * @returns {string} - The formatted collection name.
 */
collectionName(command) {
  // Split the command into individual path segments.
  const paths = command.split('/');
  // Pop the last segment (the collection file) and store it in the 'name' variable.
  const name = paths.pop();
  // Use the 'cmd' function to format the collection name.
  const formattedCollectionName = this.cmd(name);
  // Return the formatted collection name.
  return formattedCollectionName;
}

/**
 * Check if the provided type is valid and supported.
 *
 * @function hasType
 * @param {string} type - The type to be checked.
 * @returns {boolean} - True if the type is valid and supported; otherwise, false.
 */
hasType(type = 'object') {
  // Check if the 'type' parameter is a non-empty string.
  if (type && typeof type === 'string' && type.trim().length !== 0) {
    // Check if the 'type' starts with the expected format '--type='.
    if (type.startsWith('--type=')) {
      // Extract the type name after '--type='.
      const typeName = type.split('=')[1];
      // Check if the extracted type name is included in the list of supported types returned by the 'types' function.
      if (this.types().includes(typeName)) {
        // The type is valid and supported.
        return true;
      } else {
        // The type is not supported.
        return false;
      }
    } else {
      // The 'type' parameter has an invalid format.
      return false;
    }
  } else {
    // The 'type' parameter is not a valid non-empty string.
    return false;
  }
}


/**
 * Get the schema type based on the provided type parameter.
 *
 * @function schemaType
 * @param {string} type - The type parameter in the format '--type=' followed by the type name.
 * @returns {string} - The schema type if the provided type is valid and supported; otherwise, 'object'.
 */
schemaType(type = '--type=object') {
  // Check if the provided 'type' is valid and supported using the 'hasType' function.
  if (this.hasType(type)) {
    // If the type is valid and supported, extract the type name after '--type=' and return it as the schema type.
    return type.split('=')[1];
  } else {
    // If the provided 'type' is not valid or not supported, return the default schema type 'object'.
    return 'object';
  }
}

/**
 * Create a new migration file for a model/schema.
 *
 * @function makeMigration
 * @param {string} command - The command to create the migration, including the model/schema name or path.
 * @param {string} type - The schema type to be used in the migration. Default value is 'object'.
 * @returns {Promise<void>} - A Promise that resolves when the migration is created.
 */
async makeMigration(command, type = 'object') {
  // Check if the command starts with '--schema=' and extract the model/schema name or path.
  if (command.startsWith('--schema=')) {
    command = command.split('--schema=')[1];
  }

  // Check if the provided 'type' parameter is a valid and supported type using the 'hasType' function.
  if (this.hasType) {
    // Check for the installation of '@mongodb-model/db-schema' package using the 'checkForInstallation' function.
    this.checkForInstallation();

    // Add the required directory for the migration using the 'addDirectory' function.
    await this.addDirectory(this.modelPath(command));

    // Check if the model/schema name is missing or undefined.
    if (!this.modelName(command) || this.modelName(command) === undefined) {
      // If the name is missing, check if the command is a single name or a path.
      if (command && command.split('/').length === 1) {
        // If it is a single name, check if a migration file for the model/schema already exists.
        if (!existsSync(join(this.modelPath(command), `${command}.js`))) {
          // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
          const writable = this.createWriteStream(join(this.modelPath(command), `${command}.js`));
          writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(command)} migration successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m migration already exists!\x1b[0m`);
        }
      } else {
        // If the command is a path, check if a migration file for the model/schema already exists.
        if (!existsSync(join(this.modelPath(command), `${command.split('/').pop()}.js`))) {
          // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
          const writable = this.createWriteStream(join(this.modelPath(command), `${command.split('/').pop()}.js`));
          writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(command)} migration successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        }
      }
    } else {
      // If the model/schema name is provided, check if a migration file for the model/schema already exists.
      if (!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
        // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
        const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
        writable.write(schema({ name: this.cmd(this.modelName(command)), options: {}, type: this.schemaType(type) }));
        writable.end('');
        console.log(`\x1b[32m${this.cmd(this.modelName(command))} migration successfully created!\x1b[0m`);
      } else {
        console.log(`\x1b[32m${this.cmd(this.modelName(command))}\x1b[0m\x1b[31m migration already exists!\x1b[0m`);
      }
    }
  } else {
    // If the 'hasType' function is not available, display a message for using the correct 'make:schema' command.
    return console.log('command make:schema', command);
  }
}



  // async makeMigration(command, type = 'object'){
  //   if(command.startsWith('--schema=')){
  //     command = command.split('--schema=')[1];
  //   }
  //   if(this.hasType){
  //     this.checkForInstallation();
  //     await this.addDirectory(this.modelPath(command));
  //     if(!this.modelName(command) || this.modelName(command) === undefined){
  //       if(command && command.split('/').length == 1){
  //         if(!existsSync(join(this.modelPath(command), `${command}.js`))){
  //           const writable = this.createWriteStream(join(this.modelPath(command), `${command}.js`));
  //           writable.write(schema({name: this.cmd(command), options: {}, type: this.schemaType(type) }));
  //           writable.end('');
  //           console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
  //         }else{
  //           console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
  //         }
  //       }else{
  //         if(!existsSync(join(this.modelPath(command), `${command.split('/').pop()}.js`))){
  //           const writable = this.createWriteStream(join(this.modelPath(command), `${command.split('/').pop()}.js`));
  //           writable.write(schema({name: this.cmd(command), options: {}, type: this.schemaType(type) }));
  //           writable.end('');
  //           console.log(`\x1b[32m${this.cmd(command)} schema successfully created!\x1b[0m`);
  //         }else{
  //           console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
  //         }
  //       }
  //     }else{
  //       if(!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))){
  //         const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
  //         writable.write(schema({name: this.cmd(this.modelName(command)),options: {}, type: this.schemaType(type) }));
  //         writable.end('');
  //         console.log(`\x1b[32m${this.cmd(this.modelName(command))} schema successfully created!\x1b[0m`);
  //       }else{
  //         console.log(`\x1b[32m${this.cmd(this.modelName(command))}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
  //       }
  //     }
  //   }else{
  //     return console.log('command make:schema', command)
  //   }

  // }

/**
 * Create a new native migration file for a model/schema.
 *
 * @function makeNativeMigration
 * @param {string} command - The command to create the migration, including the model/schema name or path.
 * @param {string} type - The schema type to be used in the migration. Default value is 'object'.
 * @returns {Promise<void>} - A Promise that resolves when the native migration is created.
 */
async makeNativeMigration(command, type = 'object') {
  // Check if the command starts with '--schema=' and extract the model/schema name or path from it.
  if (command.startsWith('--schema=')) {
    command = command.split('--schema=')[1];
  }

  // Check if the provided 'type' parameter is a valid and supported type using the 'hasType' function.
  if (this.hasType) {
    // Check for the installation of '@mongodb-model/db-schema' package using the 'checkForInstallation' function.
    this.checkForInstallation();

    // Add the required directory for the native migration using the 'addDirectory' function.
    await this.addDirectory(this.modelPath(command));

    // Check if the model/schema name is missing or undefined.
    if (!this.modelName(command) || this.modelName(command) === undefined) {
      // If the name is missing, check if the command is a single name or a path.
      if (command && command.split('/').length === 1) {
        // If it is a single name, check if a migration file for the model/schema already exists.
        if (!existsSync(join(this.modelPath(command), `${command}.js`))) {
          // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
          const writable = this.createWriteStream(join(this.modelPath(command), `${command}.js`));
          writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(command)} migration successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        }
      } else {
        // If the command is a path, check if a migration file for the model/schema already exists.
        if (!existsSync(join(this.modelPath(command), `${command.split('/').pop()}.js`))) {
          // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
          const writable = this.createWriteStream(join(this.modelPath(command), `${command.split('/').pop()}.js`));
          writable.write(schema({ name: this.cmd(command), options: {}, type: this.schemaType(type) }));
          writable.end('');
          console.log(`\x1b[32m${this.cmd(command)} migration successfully created!\x1b[0m`);
        } else {
          console.log(`\x1b[32m${this.cmd(command)}\x1b[0m\x1b[31m schema already exists!\x1b[0m`);
        }
      }
    } else {
      // If the model/schema name is provided, check if a migration file for the model/schema already exists.
      if (!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
        // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
        const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
        writable.write(schema({ name: this.cmd(this.modelName(command)), options: {}, type: this.schemaType(type) }));
        writable.end('');
        console.log(`\x1b[32m${this.cmd(this.modelName(command))} migration successfully created!\x1b[0m`);
      } else {
        console.log(`\x1b[32m${this.cmd(this.modelName(command))}\x1b[0m\x1b[31m migration already exists!\x1b[0m`);
      }
    }
  } else {
    // If the 'hasType' function is not available, display a message for using the correct 'make:schema' command.
    return console.log('command make:schema', command);
  }
}


/**
 * Create a new migration file for a model/schema.
 *
 * @function migrate
 * @param {string} command - The command to create the migration, including the model/schema name or path.
 * @param {string} type - The schema type to be used in the migration. Default value is 'object'.
 * @returns {Promise<void>} - A Promise that resolves when the migration is created.
 */
async migrate(command, type = 'object') {
  // Check if the 'hasType' function is available to verify the 'type' parameter.
  if (this.hasType) {
    // Check if the model/schema name is not undefined.
    if (this.modelName(command) !== undefined) {
      // Check for the installation of '@mongodb-model/db-schema' package using the 'checkForInstallation' function.
      this.checkForInstallation();

      // Add the required directory for the migration using the 'addDirectory' function.
      await this.addDirectory(this.modelPath(command));

      // Check if a migration file for the model/schema already exists.
      if (existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))) {
        // If the migration file already exists, display a message indicating that the migration already exists.
        console.log(`\x1b[32m${this.modelName(command)}\x1b[0m\x1b[31m migration already exists!\x1b[0m`);
      } else {
        // If the migration file doesn't exist, create a new migration file using the 'schema' function and write it to the file.
        const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
        writable.write(schema({ name: this.cmd(this.modelName(command)), type: this.schemaType(type) }));
        writable.end('');
        console.log(`\x1b[32m${this.modelName(command)} migration successfully created!\x1b[0m`);
      }
    }
  } else {
    // If the 'hasType' function is not available, display a message for using the correct 'make:migration' command.
    return console.log('command make:migration', command);
  }
}


/**
 * Add default methods and properties to the current object.
 *
 * @function addDefault
 */
addDefault() {
  // If 'createWriteStream' function is not available, assign it to the current object.
  if (!this.createWriteStream) this.createWriteStream = createWriteStream;

  // If 'createReadStream' function is not available, assign it to the current object.
  if (!this.createReadStream) this.createReadStream = createReadStream;

  // If 'promises' object is not available, assign it to the current object.
  if (!promises) this.promises = promises;
}

/**
 * Get an array of auto-invoked method names.
 *
 * @function autoinvoked
 * @returns {Array} An array of auto-invoked method names.
 */
autoinvoked() {
  // Return an array containing the name of the auto-invoked method "addDefault".
  return ["addDefault"];
}


}

module.exports = Migration;

