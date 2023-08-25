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
 * @module Migrate
 * @kind class
 *
 * @extends Migrate
 * @requires Migrate
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc Migrate class
 */



const { createReadStream, createWriteStream, promises, readdirSync, statSync } = require("fs");
const { join } = require('node:path');
const { mkdir } = promises
const { existsSync, lstatSync } = require('fs')
// const Model = require('../base-model')
const Model = require('../../')
const couleurs = require('../couleurs')
const { Green, Red, Blue, BBlue } = couleurs()


class Migrate extends require("../base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });


    // auto bind methods
    this.autobind(Migrate);
    // auto invoke methods
    this.autoinvoker(Migrate);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


/**
 * Returns an array containing various data types.
 *
 * @returns {string[]} An array containing various data types.
 */
types() {
  /**
   * Returns an array containing various data types.
   *
   * @returns {string[]} An array containing various data types.
   */
  return [
    'double', 'string', 'object', 'array', 'objectId', 'data', 'bool',
    'null', 'regex', 'int', 'timestamp', 'long', 'decimal', 'uuid', 'bindData',
    'mixed'
  ];
}

  /**
 * Generates a command string based on the input `cmdCommand`.
 *
 * @param {string} [cmdCommand='User'] - The command string to be processed. Defaults to 'User'.
 * @returns {string} The generated command string in lowercase.
 */
cmd(cmdCommand = 'User') {
  /**
   * Generates a command string based on the input `cmdCommand`.
   *
   * @param {string} [cmdCommand='User'] - The command string to be processed. Defaults to 'User'.
   * @returns {string} The generated command string in lowercase.
   */
  return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase() : `${cmdCommand}s`.toLocaleLowerCase();
}


/**
 * Generates an absolute file path by joining the given `path` with the current working directory.
 *
 * @param {string} [path='/app/schemas'] - The path to be joined with the current working directory. Defaults to '/app/schemas'.
 * @returns {string} The absolute file path.
 */
path(path = '/app/schemas') {
  /**
   * Generates an absolute file path by joining the given `path` with the current working directory.
   *
   * @param {string} [path='/app/schemas'] - The path to be joined with the current working directory. Defaults to '/app/schemas'.
   * @returns {string} The absolute file path.
   */
  return require('path').join(process.cwd(), path);
}


  /**
 * Generates an absolute file path for the migration directory by joining the given `path` with the current working directory.
 *
 * @param {string} [path='/database/migrations'] - The path to be joined with the current working directory. Defaults to '/database/migrations'.
 * @returns {string} The absolute file path for the migration directory.
 */
migrationPath(path = '/database/migrations') {
  /**
   * Generates an absolute file path for the migration directory by joining the given `path` with the current working directory.
   *
   * @param {string} [path='/database/migrations'] - The path to be joined with the current working directory. Defaults to '/database/migrations'.
   * @returns {string} The absolute file path for the migration directory.
   */
  return require('path').join(process.cwd(), path);
}


/**
 * Asynchronously creates a directory at the given `path` if it does not already exist.
 *
 * @param {string} [path=this.path()] - The path for the directory to be created. Defaults to the result of the 'path' function.
 * @returns {Promise<void>} A promise that resolves when the directory is created (or if it already exists).
 */
async addDirectory(path = this.path()) {
  /**
   * Asynchronously creates a directory at the given `path` if it does not already exist.
   *
   * @param {string} [path=this.path()] - The path for the directory to be created. Defaults to the result of the 'path' function.
   * @returns {Promise<void>} A promise that resolves when the directory is created (or if it already exists).
   */
  const { existsSync } = require('fs');

  if (!existsSync(path)) {
    // Check if the directory already exists.
    // If not, create the directory recursively using fs.promises.mkdir().
    await require('fs').promises.mkdir(path, { recursive: true });
  }
}

/**
 * Checks if the '@mongodb-model/model' package is installed. If not, it attempts to install it using npm.
 * This function uses the 'exec' method from the 'child_process' module to run the npm commands.
 * Note: It's important to have 'npm' installed and accessible in the system to use this function.
 *
 * @returns {void}
 */
checkForInstallation() {
  /**
   * Checks if the '@mongodb-model/model' package is installed. If not, it attempts to install it using npm.
   * This function uses the 'exec' method from the 'child_process' module to run the npm commands.
   * Note: It's important to have 'npm' installed and accessible in the system to use this function.
   *
   * @returns {void}
   */
  const { exec } = require('child_process');

  exec('npm list @mongodb-model/model', (error, stdout, stderr) => {
    // Check if there is an error while executing 'npm list'.
    if (error) {
      exec('npm install @mongodb-model/model', (err, sto, sdi) => {
        // Check if there is an error while executing 'npm install'.
        if (err) return error;

        // If 'npm install' command was successful, it will have output in 'sto'.
        if (sto) {
          console.log(sto); // Log the output (optional).
        }
      });
    }
  });
}

/**
 * Generates the absolute file path for the model based on the given `command`.
 *
 * @param {string} command - The command representing the model path, e.g., 'user/create' or 'post/update'.
 * @returns {string} The absolute file path for the model based on the `command`.
 */
modelPath(command) {
  /**
   * Generates the absolute file path for the model based on the given `command`.
   *
   * @param {string} command - The command representing the model path, e.g., 'user/create' or 'post/update'.
   * @returns {string} The absolute file path for the model based on the `command`.
   */
  const paths = command.split('/');
  paths.pop(); // Remove the last element (model file name).
  const modelPath = '/app/schemas/' + paths.join('/'); // Join the remaining paths to form the model path.
  return this.path(modelPath); // Return the absolute file path using the 'path' function.
}

/**
 * Generates the absolute file path for the migration model based on the given `command`.
 *
 * @param {string} command - The command representing the migration model path, e.g., 'create_users_table' or 'add_column_to_posts'.
 * @returns {string} The absolute file path for the migration model based on the `command`.
 */
migrationModelPath(command) {
  /**
   * Generates the absolute file path for the migration model based on the given `command`.
   *
   * @param {string} command - The command representing the migration model path, e.g., 'create_users_table' or 'add_column_to_posts'.
   * @returns {string} The absolute file path for the migration model based on the `command`.
   */
  const paths = command.split('/');
  paths.pop(); // Remove the last element (migration model file name).
  const modelPath = '/database/migrations/' + paths.join('/'); // Join the remaining paths to form the migration model path.
  return this.migrationPath(modelPath); // Return the absolute file path using the 'migrationPath' function.
}

/**
 * Extracts the model name from the given `command` and returns it with the first letter capitalized.
 *
 * @param {string} command - The command representing the model path, e.g., 'user/create' or 'post/update'.
 * @returns {string} The model name with the first letter capitalized.
 */
modelName(command) {
  /**
   * Extracts the model name from the given `command` and returns it with the first letter capitalized.
   *
   * @param {string} command - The command representing the model path, e.g., 'user/create' or 'post/update'.
   * @returns {string} The model name with the first letter capitalized.
   */
  const paths = command.split('/');
  const name = paths.pop(); // Extract the model name from the command.
  return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter of the model name.
}

/**
 * Extracts the collection name from the given `command`, assuming the command follows the pattern '--schema=<Schema Name>/collection'.
 *
 * @param {string} command - The command representing the model path with schema name and collection, e.g., '--schema=User/create' or '--schema=Post/update'.
 * @returns {string} The collection name extracted from the command, converted to lowercase and pluralized if needed.
 */
collectionName(command) {
  /**
   * Extracts the collection name from the given `command`, assuming the command follows the pattern '--schema=<Schema Name>/collection'.
   *
   * @param {string} command - The command representing the model path with schema name and collection, e.g., '--schema=User/create' or '--schema=Post/update'.
   * @returns {string} The collection name extracted from the command, converted to lowercase and pluralized if needed.
   */
  const paths = command.split('--schema=')[1]; // Extract the part after '--schema='
  const name = paths.split('/').pop(); // Extract the collection name from the remaining part.
  return this.cmd(name); // Convert the collection name to lowercase and pluralize if needed using the 'cmd' function.
}


/**
 * Handles the "onCreateCollection" event and logs a success message indicating that the specified collection has been successfully migrated.
 *
 * @param {object} namespace - The namespace object containing information about the collection.
 */
onCreateCollection(namespace) {
  /**
   * Handles the "onCreateCollection" event and logs a success message indicating that the specified collection has been successfully migrated.
   *
   * @param {object} namespace - The namespace object containing information about the collection.
   */
  const { collection } = namespace;
  let firstIndex = Array.from(collection).findIndex((str) => str == ':');
  let secondIndex = Array.from(collection).findIndex((str) => str == ',');
  let string = namespace.collection
    .slice(firstIndex, secondIndex)
    .split(':')
    .filter((str) => str.trim().length !== 0)
    .join('')
    .split(`\x1B[32m'`)
    .filter((str) => str.trim().length !== 0)
    .join('')
    .split("'")[0];

  // Log the success message.
  console.log(Green(`${namespace.db}.${namespace.collection} successfully migrated!`));
}


/**
 * Handles the "onCreateCollectionError" event and logs an error message when an error occurs during collection creation.
 *
 * @param {object} error - The error object containing information about the error that occurred during collection creation.
 */
onCreateCollectionError(error) {
  /**
   * Handles the "onCreateCollectionError" event and logs an error message when an error occurs during collection creation.
   *
   * @param {object} error - The error object containing information about the error that occurred during collection creation.
   */
  // const { message } = error;
  // let firstIndex = Array.from(message).findIndex((str) => str == ':');
  // let secondIndex = Array.from(message).findIndex((str) => str == ',');

  // // Extract and clean the relevant information from the error message.
  // let string = error.message
  //   .slice(firstIndex, secondIndex)
  //   .split(':')
  //   .filter((str) => str.trim().length !== 0)
  //   .join('')
  //   .split(`\x1B[32m'`)
  //   .filter((str) => str.trim().length !== 0)
  //   .join('')
  //   .split("'")[0];

  // // Log the error message with the extracted information.
  // console.log('string error', error.message);
  // console.log('string error', string);

  // Note: The following lines are commented out and not executed.
  // They seem to be an attempt to further manipulate the error message,
  // but they are currently unreachable due to the 'return' statements above.

  // let string = error.message
  //  string = error.message.split(' ').slice(1);//.join(' ').trim()
  //  string.pop();
  //  string  = string.join(' ').trim()
  // return;// (error && error.codeName === 'NamespaceExists') ? console.log(Red(`${string} migrated!`)): ''
}


/**
 * Extracts and returns the schema name from the provided string if it starts with "--schema=", otherwise returns false.
 *
 * @param {string} name - The string to extract the schema name from.
 * @returns {string|boolean} - The extracted schema name or false if the string does not start with "--schema=".
 */
schemaName(name = 'User') {
  /**
   * Extracts and returns the schema name from the provided string if it starts with "--schema=", otherwise returns false.
   *
   * @param {string} name - The string to extract the schema name from.
   * @returns {string|boolean} - The extracted schema name or false if the string does not start with "--schema=".
   */
  if (name.startsWith('--schema=')) {
    // Remove the "--schema=" prefix and trim any whitespace.
    name = name.split('=')[1].trim();
    // If the resulting name is empty, return false.
    if (name.length === 0) return false;
    // Return the extracted schema name.
    return name;
  }
  // Return false if the string does not start with "--schema=".
  return false;
}

/**
 * Generates the file path for the schema file based on the provided command.
 *
 * @param {string} command - The command containing the schema name.
 * @returns {string|Error} - The file path for the schema file or an error if an exception occurs.
 */
schemaPath(command) {
  /**
   * Generates the file path for the schema file based on the provided command.
   *
   * @param {string} command - The command containing the schema name.
   * @returns {string|Error} - The file path for the schema file or an error if an exception occurs.
   */
  try {
    // Extract the schema name from the command.
    const schemaName = this.schemaName(command);
    // Generate the file path for the schema file based on the schema name.
    const filePath = join(this.modelPath(schemaName), `${this.modelName(schemaName)}.js`);
    // Return the file path.
    return filePath;
  } catch (error) {
    // If an exception occurs during the process, return the error.
    return error;
  }
}

/**
 * Generates and returns the file path by joining the base and path.
 *
 * @param {string} base - The base directory path.
 * @param {string} path - The additional path to be joined with the base.
 * @returns {string} - The resulting file path after joining the base and path.
 */
filePath(base = './app', path = './') {
  /**
   * Generates and returns the file path by joining the base and path.
   *
   * @param {string} base - The base directory path.
   * @param {string} path - The additional path to be joined with the base.
   * @returns {string} - The resulting file path after joining the base and path.
   */
  return join(base, path);
}


/**
 * Creates a default directory at the specified path if it doesn't already exist.
 *
 * @param {string} defaultPath - The path of the default directory to create.
 */
createDefaultDirectory(defaultPath) {
  /**
   * Creates a default directory at the specified path if it doesn't already exist.
   *
   * @param {string} defaultPath - The path of the default directory to create.
   */
  const path = require('path').join(process.cwd(), defaultPath);

  // Check if the directory exists at the specified path.
  if (!existsSync(path)) {
    // If the directory does not exist, create it recursively.
    require('fs').mkdir(defaultPath, { recursive: true }, (err) => {
      if (err) {
        // If there is an error while creating the directory, log the error message.
        console.error('Error creating directory:', err.message);
      } else {
        // Directory created successfully.
        // console.log('Directory created successfully.');
      }
    });
  }
}


/**
 * Checks if a schema file exists at the specified path in the schemas directory.
 *
 * @param {string} command - The command that includes the schema path in the format '--schema=<SchemaName>'.
 * @param {string} schemasPath - The path to the schemas directory. Default is './app/schemas'.
 * @returns {boolean} - Returns true if the schema file exists, otherwise false.
 */
hasSchema(command, schemasPath = './app/schemas') {
  // Extract the schema name from the command argument.
  const name = 'app/schemas/' + command.split('=')[1] + '.js';

  // Check if the schemas directory exists. If not, create it recursively.
  if (!existsSync(require('path').join(process.cwd(), schemasPath))) {
    require('fs').mkdir(schemasPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory:', err.message);
      } else {
        // Get all files in the schemas directory.
        const files = this.getAllFiles(schemasPath);

        if (files && files.length > 0) {
          // Check if the schema file exists in the schemas directory.
          const result = files.find(file => file === name);
          if (result && result !== undefined) return true;
          return false;
        } else {
          return false;
        }
      }
    });
  } else {
    // Get all files in the schemas directory.
    const files = this.getAllFiles(schemasPath);

    if (files && files.length > 0) {
      // Check if the schema file exists in the schemas directory.
      const result = files.find(file => file === name);
      if (result && result !== undefined) return true;
      return false;
    } else {
      return false;
    }
  }
}

/**
 * Checks if a migration file exists at the specified path in the migrations directory.
 *
 * @param {string} command - The command that includes the migration path in the format '--schema=<MigrationName>'.
 * @param {string} migrationsPath - The path to the migrations directory. Default is './database/migrations'.
 * @returns {boolean} - Returns true if the migration file exists, otherwise false.
 */
hasMigration(command, migrationsPath = './database/migrations') {
  // Extract the migration name from the command argument.
  const name = 'database/migrations/' + command.split('=')[1] + '.js';

  // Check if the migrations directory exists. If not, create it recursively.
  if (!existsSync(require('path').join(process.cwd(), migrationsPath))) {
    require('fs').mkdir(migrationsPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory:', err.message);
      } else {
        // Get all files in the migrations directory.
        const files = this.getAllFiles(migrationsPath);

        if (files && files.length > 0) {
          // Check if the migration file exists in the migrations directory.
          const result = files.find(file => file === name);
          if (result && result !== undefined) return true;
          return false;
        } else {
          return false;
        }
      }
    });
  } else {
    // Get all files in the migrations directory.
    const files = this.getAllFiles(migrationsPath);

    if (files && files.length > 0) {
      // Check if the migration file exists in the migrations directory.
      const result = files.find(file => file === name);
      if (result && result !== undefined) return true;
      return false;
    } else {
      return false;
    }
  }
}

// allSchemaMigration(file, model = new Model) {
//   //model.on('createCollection', this.onCreateCollection)
//   //return console.log(this.cmd(file.split('/').pop().split('.js').join('')))
//   // return console.log(require(join(process.cwd(),'./'+file)))
//   model.createCollection(this.cmd(file.split('/').pop().split('.js').join('')), require(join(process.cwd(), './' + file))).then(response => {
//     if (response && response.s && response.s.namespace) {
//       console.log(Green("Migrated: " + response.s.namespace))

//     }
//   })//.catch(console.log)

//   // if(model.listenerCount('createCollection') > 1){
//   //     model.removeListener('createCollection',this.onCreateCollection)
//   // }else{
//   //     model.on('createCollection', this.onCreateCollection)
//   // }
//   // if(model.listenerCount('createCollection-error') > 1){
//   //     model.removeListener('createCollection-error',this.onCreateCollectionError)
//   // }else{
//   //     model.on('createCollection-error', this.onCreateCollectionError)
//   // }
// }

/**
 * Performs migration of a schema by creating a collection in the database.
 *
 * @param {string} file - The path to the schema migration file in the format './app/schemas/SchemaName.js'.
 * @param {Model} model - An instance of the Model class representing the MongoDB model for database operations.
 */
allSchemaMigration(file, model = new Model) {
  // Register the 'createCollection' event listener to handle successful migration.
  model.on('createCollection', this.onCreateCollection);

  // Extract the schema name from the file path and log it to the console.
  const schemaName = this.cmd(file.split('/').pop().split('.js').join(''));
  if(!schemaName || schemaName.trim().length === 0)  return 
  if(!existsSync(join(process.cwd(), './' + file))) return;
  //console.log(schemaName);

  // Load the schema module and log it to the console (assuming the path is correct).
  //console.log(require(join(process.cwd(), './' + file)));

  // Perform the migration by creating a collection in the database using the schema name and module.



         try {
          model.createCollection(schemaName, require(join(process.cwd(), './' + file)))
          .then(response => {
            if (response && response.s && response.s.namespace) {
             return console.log(Green("Migrated: " + response.s.namespace));
            }
          })
          .catch(error => {
            console.error('Error occurred during migration:', error);
          });
      
        // Check and manage the 'createCollection' and 'createCollection-error' event listeners.
        if (model.listenerCount('createCollection') > 1) {
          model.removeListener('createCollection', this.onCreateCollection);
        } else {
          model.on('createCollection', this.onCreateCollection);
        }
      
        if (model.listenerCount('createCollection-error') > 1) {
          model.removeListener('createCollection-error', this.onCreateCollectionError);
        } else {
          model.on('createCollection-error', this.onCreateCollectionError);
        }
         }catch(error){
          console.log('ERRROR: IN allSchemaMigration')
         }
}


/**
 * Performs migration of a migration file by executing the migration process.
 *
 * @param {string} file - The path to the migration file in the format './database/migrations/MigrationName.js'.
 * @param {Model} model - An instance of the Model class representing the MongoDB model for database operations.
 */
allMigrationMigration(file, model = new Model) {
  // Perform the migration by creating a collection in the database using the migration file.
  if(!existsSync(require(join(process.cwd(), './' + file)))) return;

  if(this.cmd(file.split('/').pop().split('.js').join('')) && this.cmd(file.split('/').pop().split('.js').join('')).trim().length > 0){

    model.createCollection(this.cmd(file.split('/').pop().split('.js').join('')), require(join(process.cwd(), './' + file)))
    .then(response => {
      if (response && response.s && response.s.namespace) {
        return console.log(Green("Migrated: " + response.s.namespace));
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      console.error('Error occurred during migration:', error);
    });
  }else{
    return console.log('Invalid migration name')
  }
}

/**
 * Performs schema migration by creating a collection in the database using the specified schema file.
 *
 * @param {string} command - The command string containing the schema information in the format '--schema=SchemaName'.
 * @param {Model} model - An instance of the Model class representing the MongoDB model for database operations.
 */
schemaMigration(command, model = new Model) {

  // Extract the schema name from the command string.
  const schemaName = command.split('=')[1].trim();


  

  if(!schemaName || schemaName.trim().length === 0) return ;
  if(!existsSync(join(process.cwd(), './app/schemas/' + schemaName + '.js'))) return ;

  // Add event listeners for the 'createCollection' and 'createCollection-error' events.
  model.on('createCollection', this.onCreateCollection);
  model.on('createCollection-error', this.onCreateCollectionError);

  // Perform the schema migration by creating a collection in the database using the specified schema file.

     try {
        if(command && command.trim().length > 0){
          model.createCollection(this.collectionName(command), require(join(process.cwd(), './app/schemas/' + schemaName + '.js')))
          .then(response => {
            if (response && response.s && response.s.namespace) {
              return console.log(Green("Migrated: " + response.s.namespace));
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.error('Error occurred during schema migration:', error);
          });
        }else{
          return console.log('Invalid collection name')
        }
     }catch(error){
       console.log("ERROR: schemaMigration", error.message)
     }

}


/**
 * Performs migration of a single migration file by executing its contents in the database.
 *
 * @param {string} command - The command string containing the migration file information in the format '--migration=MigrationFileName'.
 * @param {Model} model - An instance of the Model class representing the MongoDB model for database operations.
 */
migrationMigration(command, model = new Model) {
  // Extract the migration file name from the command string.
  const migrationFileName = command.split('=')[1].trim();
  if(migrationFileName.trim().length  === 0 || !migrationFileName) return console.log(Red(`migration ${migrationFileName}.js' is not found`));
  if(!existsSync(join(process.cwd(), './database/migrations/' + migrationFileName + '.js'))) return console.log(Red(`migration ${migrationFileName}.js' is not found`));
  // Add event listeners for the 'createCollection' and 'createCollection-error' events.
  model.on('createCollection', this.onCreateCollection);
  model.on('createCollection-error', this.onCreateCollectionError);
    // Perform the migration of the single migration file by executing its contents in the database.
  model.createCollection(this.collectionName(command), require(join(process.cwd(), './database/migrations/' + migrationFileName + '.js')))
  .then(response => {
    if (response && response.s && response.s.namespace) {
      return console.log(Green("Migrated: " + response.s.namespace));
    } else {
      console.log(response);
    }
  })
  .catch(error => {
    return console.log(Red('Error occurred during migration of the single migration file:' + error))
  });
 
}


/**
 * Recursively reads all files from a given directory and its subdirectories.
 *
 * @param {string} dirPath - The path of the directory to read files from.
 * @param {string[]} files - An array to store the paths of the read files (default is an empty array).
 * @returns {Promise<string[]|Error>} - A Promise that resolves to an array of file paths or rejects with an Error if an error occurs.
 */
async readdirRecursive(dirPath, files = []) {
  try {
    // Read all files in the specified directory.
    const allFiles = await promises.readdir(dirPath);

    if (allFiles) {
      // Iterate over each file in the directory.
      for await (let file of allFiles) {
        // Check if the current item is a subdirectory.
        if ((await promises.stat(join(dirPath, file))).isDirectory()) {
          // If it is a subdirectory, recursively call readdirRecursive to read its files.
          files = await this.readdirRecursive(join(dirPath, file), files);
        } else {
          // If it is a file, add its path to the 'files' array.
          files.push(join(__dirname, dirPath, file));
        }
      }
    }

    return files;
  } catch (error) {
    // If an error occurs during the process, the function will return the error object.
    return error;
  }
}


/**
 * Constructs the path for the schema file based on the provided command.
 *
 * @param {string} command - The command that includes the schema name.
 * @returns {string|undefined} - The path for the schema file, or undefined if the path cannot be constructed.
 */
schemaPath(command) {
  try {
    // Extract the schema name from the command.
    const schemaName = this.schemaName(command);

    // Get the model path based on the schema name.
    const modelPath = this.modelPath(schemaName);

    // Get the model name based on the schema name.
    const modelName = this.modelName(schemaName);

    // Join the model path and model name to get the full path for the schema file.
    const fullPath = join(modelPath, modelName);

    // Split the fullPath using the '/mongo-transform/' string and return the second part.
    // The second part will be the path for the schema file after the '/mongo-transform/' string.
    return fullPath.split('/mongo-transform/')[1];
  } catch (error) {
    // If any error occurs during the process, return undefined.
    return undefined;
  }
}


/**
 * Recursively gets all the files in a directory and its subdirectories.
 *
 * @param {string} dirPath - The directory path to start searching for files.
 * @param {Array<string>} [arrayOfFiles] - An optional array to store the file paths.
 * @returns {Array<string>} - An array containing the paths of all the files found.
 */
getAllFiles(dirPath, arrayOfFiles) {
  // Get the list of files in the current directory.
  let files = readdirSync(dirPath);

  // If arrayOfFiles is not provided, initialize it as an empty array.
  arrayOfFiles = arrayOfFiles || [];

  // Iterate through the files in the current directory.
  files.forEach(function (file) {
    // Check if the current file is a directory.
    if (statSync(dirPath + "/" + file).isDirectory()) {
      // If it is a directory, recursively call getAllFiles to get files inside the subdirectory.
      arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      // If it is a file, push its path to the arrayOfFiles array.
      arrayOfFiles.push(join(dirPath, "/", file));
    }
  }.bind(this));

  // Return the array containing the paths of all the files found.
  return arrayOfFiles;
}

/**
 * Migrates all the available migration files in the specified migration path.
 *
 * @param {string} command - The command used to trigger the migration.
 * @param {string} [migrationPath='./database/migrations'] - The path to the migration files.
 */
migrateAllMigrations(command, migrationPath = './database/migrations') {
  try {
    // Get all the migration files in the specified migration path.
    const migrationFiles = this.getAllFiles(migrationPath);

    // Helper function to check if there are migration files available.
    const hasMigrationFiles = () => migrationFiles && migrationFiles.length > 0;

    // If there are migration files available, loop through each file and execute migration.
    if (hasMigrationFiles()) {
      migrationFiles.forEach(migrationFile => {
        // Check if the migration file exists.
        if (existsSync('./' + migrationFile)) {
          // Execute migration for the current file.
          this.allMigrationMigration(migrationFile);
        }
      });
    } else {
      // If there are no migration files available, display a message.
      //return console.log(BBlue('No migrations available'));
    }
  } catch (error) {
    // Handle errors that occur during migration.
    if (error.message.includes('ENOENT: no such file or directory')) {
      // If the migration path does not exist, create the directory recursively.
      this.addDirectory(this.migrationPath(migrationPath));
    } else {
      // Log other errors that occur during migration.
      console.log(error.message);
    }
  }
}

/**
 * Migrates all the available schema files in the specified schema path.
 *
 * @param {string} command - The command used to trigger the migration.
 * @param {string} [schemaPath='./app/schemas'] - The path to the schema files.
 */
migrateAllSchemas(command, schemaPath = './app/schemas') {
  try {
    // Get all the schema files in the specified schema path.
    const schemaFiles = this.getAllFiles(schemaPath);

    // Helper function to check if there are schema files available.
    const hasSchemaFiles = () => schemaFiles && schemaFiles.length > 0;

    // If there are schema files available, loop through each file and execute migration.
    if (hasSchemaFiles()) {
      schemaFiles.forEach(schemaFile => {
        // Check if the schema file exists.
        if (existsSync('./' + schemaFile)) {
          // Execute migration for the current schema file.
          this.allSchemaMigration(schemaFile);
        }
      });
    } else {
      // If there are no schema files available, display a message.
      console.log(BBlue('No schemas available'));
    }
  } catch (error) {
    // Handle errors that occur during migration.
    if (error.message.includes('ENOENT: no such file or directory')) {
      // If the schema path does not exist, create the directory recursively.
      this.addDirectory(this.path(schemaPath));
    } else {
      // Log other errors that occur during migration.
      console.log(error.message);
    }
  }
}

/**
 * Migrates all the available schema files and migration files.
 *
 * @param {string} command - The command used to trigger the migration.
 * @param {string} [schemaPath='./app/schemas'] - The path to the schema files.
 * @param {string} [migrationPath='./database/migrations'] - The path to the migration files.
 */
migrateAll(command, schemaPath = './app/schemas', migrationPath = './database/migrations') {
  // Check if the migration path exists.
  if (existsSync(this.migrationPath(migrationPath))) {
    // If the migration path exists, perform migration for all migration files.
    this.migrateAllMigrations(command, migrationPath);
  }

  // Check if the schema path exists.
  if (existsSync(this.path(schemaPath))) {
    // If the schema path exists, perform migration for all schema files.
    this.migrateAllSchemas(command, schemaPath);
  }
}

/**
 * Creates a new directory with the given name at the specified absolute path.
 *
 * @param {string} [absolutePath='../app'] - The absolute path where the new directory will be created.
 * @param {string} [directory='models'] - The name of the new directory to be created.
 * @returns {Promise<void>} A Promise that resolves once the directory is created.
 */
async makeDirectory(absolutePath = '../app', directory = 'models') {
  try {
    // Construct the absolute path of the new directory.
    const projectFolder = join(process.cwd(), absolutePath, directory);

    // Attempt to create the new directory with recursive set to true, allowing for nested directories.
    await mkdir(projectFolder, { recursive: true });

    // Log a success message once the directory is created.
    console.log(`Directory created at: ${projectFolder}`);

    // Return the directory creation result.
    return true;
  } catch (error) {
    // Handle any errors that occur during directory creation.
    console.error('Error creating directory:', error.message);
    return false;
  }
}


/**
 * Formats and aligns text data in a tabular-like manner and prints it to the console.
 *
 * @param {...(Object|string)} args - The data to be formatted and printed. Accepts multiple arguments of either objects or strings.
 * @returns {void} The function does not return a value.
 */
texAligner(...args) {
  let options = {
    pad: 75,
    position: process.stdout.columns,
    hline: false,
    keyColor: "36",
    valueColor: "33",
  };

  // If the first argument is an object, use it to override the default options.
  if (args.length > 1) {
    if (typeof args[0] === "object") {
      for (let prop in args[0]) {
        if (options.hasOwnProperty(prop)) {
          options[prop] = args[0][prop];
        }
      }
    }
  }

  // Determine the starting index based on the presence of options object.
  let i = args.length > 1 ? 1 : 0;

  for (; i < args.length; i++) {
    if (typeof args[i] === "object") {
      // If the argument is an object, format and align its key-value pairs.
      for (let prop in args[i]) {
        let key = `\x1b[${options.keyColor}m${prop}\x1b[0m`;
        let value = `\x1b[${options.valueColor}m${args[i][prop]}\x1b[0m`;
        let padding = options.pad - key.length;

        // Add whitespace padding to the key to achieve alignment.
        for (let i = 0; i < padding; i++) {
          key += " ";
        }
        key += value;

        // If 'hline' option is true, print a horizontal line before each row.
        options.hline === true
          ? hline(1, options.position, key)
          : console.log(key);
      }
    } else {
      // If the argument is a string, format and align the string.
      let key = `\x1b[36mKey\x1b[0m`; // Default key label (in cyan color).
      let value = `\x1b[33m${args[i]}\x1b[0m`; // Value in yellow color.
      let padding = options.pad - key.length;

      // Add whitespace padding to the key to achieve alignment.
      for (let i = 0; i < padding; i++) {
        key += " ";
      }
      key += value;

      // If 'hline' option is true, print a horizontal line before each row.
      options.hline === true
        ? hline(1, options.position, key)
        : console.log(key);
    }
  }
};


/**
 * Prints vertical space (empty lines) to the console.
 *
 * @param {number} NumberOfLines - The number of empty lines to be printed. Must be a positive integer.
 * @returns {void} The function does not return a value.
 */
verticalSpace(NumberOfLines) {
  // Check if NumberOfLines is a positive integer, otherwise default it to 1.
  NumberOfLines =
    typeof NumberOfLines === "number" && NumberOfLines > 0 ? NumberOfLines : 1;

  // Print the specified number of empty lines.
  for (let i = 0; i < NumberOfLines; i++) {
    console.log("");
  }
}

  // horizontal line across the screen
/**
 * Prints a horizontal line consisting of dashes to the console.
 *
 * @returns {void} The function does not return a value.
 */
horizontalLine() {
  // Get the width of the console.
  const width = process.stdout.columns;

  // Create a string consisting of dashes to represent the horizontal line.
  let line = "";
  for (let i = 0; i < width; i++) {
    line += "-";
  }

  // Print the horizontal line to the console.
  console.log(line);
}


  // create centered text on the screen
/**
 * Prints the given string centered on the console.
 *
 * @param {string} str - The string to be centered.
 * @returns {void} The function does not return a value.
 */
centered(str) {
  // Trim the input string and ensure it is not empty.
  str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";

  // Get the width of the console.
  const width = process.stdout.columns;

  // Calculate the left padding to center the string.
  const leftPadding = Math.floor((width - str.length) / 2);

  // Create a string with left padding space before the input string.
  let line = "";
  for (let i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;

  // Print the centered string to the console.
  console.log(line);
}


/**
 * Prints the given string with a description-like format on the console.
 *
 * @param {string} str - The string to be formatted as a description.
 * @returns {void} The function does not return a value.
 */
description(str) {
  // Trim the input string and ensure it is not empty.
  str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";

  // Get the width of the console.
  const width = process.stdout.columns;

  // Calculate the left padding to format the string like a description.
  const leftPadding = Math.floor((width - str.length) / 4);

  // Create a string with left padding space before the input string.
  let line = "";
  for (let i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;

  // Print the formatted description to the console.
  console.log(line);
}

/**
 * Prints the given string with a manual-like format on the console.
 *
 * @param {string} str - The string to be formatted as a manual.
 * @returns {void} The function does not return a value.
 */
manual(str) {
  // Trim the input string and ensure it is not empty.
  str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";

  // Get the width of the console.
  const width = process.stdout.columns;

  // Calculate the left padding to format the string like a manual.
  const leftPadding = Math.floor((width - str.length) / 4);

  // Create a string with left padding space before the input string.
  let line = "";
  for (let i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;

  // Print the formatted manual text to the console.
  console.log(line);
}

/**
 * Converts the input arguments into an array of objects with "object" and "options" properties.
 * If an argument is an object and doesn't have "object" or "options" properties, it is assigned to "object" property of the resulting object.
 * If an argument is not an object, it is converted to an object with a "key" property and assigned to "object" property of the resulting object.
 *
 * @param {...*} args - The arguments to be converted.
 * @returns {Object[]} An array of objects containing "object" and "options" properties.
 */
objectToDisplay(...args) {
  let option = {};
  option.object = {};
  option.options = {};

  if (args.length === undefined || args.length === 0) {
    return option;
  }

  if (args.length >= 1) {
    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === "object") {
        if (
          !args[i].hasOwnProperty("object") &&
          !args[i].hasOwnProperty("options")
        ) {
          option.object = args[i];
          args[i] = option;
        }
        if (
          args[i].hasOwnProperty("object") &&
          !args[i].hasOwnProperty("options")
        ) {
          option.object = args[i]["object"];
          args[i] = option;
        }
        if (
          !args[i].hasOwnProperty("object") &&
          args[i].hasOwnProperty("options")
        ) {
          option.options = args[i]["options"];
          args[i] = option;
        }
      } else if (typeof args[i] !== "object") {
        if (
          !args[i].hasOwnProperty("object") &&
          args[i].hasOwnProperty("options")
        ) {
          option.object = {
            key: args[i],
          };
          args[i] = option;
        } else {
          option.object = {
            key: args[i],
          };
          args[i] = option;
        }
      }
    }
  }

  return args;
}

/**
 * Displays the provided arguments in a formatted and human-readable way using `util.inspect`.
 * The function takes a variable number of arguments (`...args`), each argument can be an object with "object" and "options" properties,
 * or just a standalone value. The "object" property contains the data to be displayed, and the "options" property specifies the options
 * to customize the display using `util.inspect`.
 *
 * If no arguments are provided, the function will display the default data "no data" with the default options specified in the `option` object.
 * If an argument is not an object, it will be displayed as is.
 *
 * @param {...*} args - The arguments to be displayed.
 */
displayer(...args) {
  let option = {
    showHidden: true,
    depth: 10,
    colors: true,
    showProxy: true,
    maxArrayLength: 100,
    maxArrayLength: Infinity,
    compact: true,
    sorted: true,
  };

  let dargs = {};
  dargs.object = {
    data: "no data",
  };
  dargs.options = option;

  if (args.length === undefined || args.length === 0) {
    console.log(util.inspect(dargs.object, dargs.options));
    return;
  }

  if (args.length >= 1) {
    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === "object") {
        if (
          args[i].hasOwnProperty("object") &&
          args[i].hasOwnProperty("options")
        ) {
          if (JSON.stringify(args[i]["options"]) !== "{}") {
            for (let prop in args[i]["options"]) {
              if (option.hasOwnProperty(prop)) {
                option[prop] = args[i]["options"][prop];
              }
            }
          }
          console.log(util.inspect(args[i]["object"], option));
        } else if (
          args[i].hasOwnProperty("object") &&
          !args[i].hasOwnProperty("options")
        ) {
          console.log(util.inspect(args[i]["object"], option));
        } else if (!args[i].hasOwnProperty("object")) {
          console.log(util.inspect(dargs.object, dargs.options));
        }
      } else {
        console.log(args[i]);
      }
    }
  }
}

/**
 * Displays the provided `object` in a formatted and human-readable way using the `displayer` function.
 * The function takes an `object` as an argument and converts it into an array of objects with optional `options`.
 * It then calls the `displayer` function to display the data from the array of objects.
 *
 * @param {Object} object - The object to be displayed.
 */
display(object) {
  // Convert the provided `object` into an array of objects with optional `options`
  const args = this.objectToDisplay(object);

  // Call the `displayer` function with the converted arguments
  this.displayer(...args);
}

/**
 * Displays a line with a specified padding on the left side and a given string using ANSI color codes.
 * The function takes optional arguments in the form of an object to customize the padding, string, number, and color.
 * If no arguments are provided, it calculates the padding based on the default options and displays the line with the default string and color.
 * If arguments are provided, it processes each argument, checks for custom options, calculates the padding, and displays the line for each argument.
 *
 * @param {...Object} args - Optional arguments to customize the padding, string, number, and color.
 *                           If no arguments are provided, it will use the default options.
 */
padding(...args) {
  let options = {
    string: "-",
    number: process.stdout.columns,
    color: 37,
  };

  if (args.length === undefined || args.length === 0) {
    // Calculate left padding
    let padding = Math.floor((process.stdout.columns - options.string.length) / options.number);
    // Build the line with left padding and the specified string using the specified color
    let line = "";
    for (let i = 0; i < padding; i++) {
      line += " ";
    }
    line += `\x1b[${options.color}m${options.string}\x1b[0m`;
    console.log(line);
    return;
  }

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === "object") {
      for (let prop in args[i]) {
        // Check for custom options and update the options object accordingly
        let checkProp = prop === "number" && args[i][prop] <= 0 ? 1 : prop;
        if (options.hasOwnProperty(checkProp)) {
          options[checkProp] = args[i][checkProp];
        }
      }
    } else {
      // Calculate left padding
      let padding = Math.floor((process.stdout.columns - options.string.length) / options.number);
      // Build the line with left padding and the specified string using the specified color
      let line = "";
      for (let i = 0; i < padding; i++) {
        line += " ";
      }
      line += `\x1b[${options.color}m${options.string}\x1b[0m`;
      console.log(line);
    }
    // Calculate left padding
    let padding = Math.floor((process.stdout.columns - options.string.length) / options.number);
    // Build the line with left padding and the specified string using the specified color
    let line = "";
    for (let i = 0; i < padding; i++) {
      line += " ";
    }
    line += `\x1b[${options.color}m${options.string}\x1b[0m`;
    console.log(line);
  }
}

/**
 * Calculates the time elapsed between two Date objects and returns the result in years, months, days, hours, minutes, and seconds.
 * If the start or end parameter is not a valid Date object, the current date and time will be used as the default.
 *
 * @param {Date} start - The start date and time. If not provided or not a valid Date object, the current date and time will be used as the default.
 * @param {Date} end - The end date and time. If not provided or not a valid Date object, the current date and time will be used as the default.
 *
 * @returns {Object} - An object containing the calculated elapsed time in years, months, days, hours, minutes, and seconds.
 *                    The properties of the object are: years, months, days, hours, minutes, and seconds.
 */
elapsed(start = new Date(), end = new Date()) {
  // If start parameter is not a valid Date object, use the current date and time
  if (!util.types.isDate(start)) {
    start = new Date();
  }
  // If end parameter is not a valid Date object, use the current date and time
  if (!util.types.isDate(end)) {
    end = new Date();
  }

  // Initialize the result object to store the calculated elapsed time
  let result = {};

  // Get the time difference in seconds
  let diffInSeconds = (end - start) / 1000;

  // Calculate elapsed time in years, months, days, hours, minutes, and seconds
  let years = Math.trunc(diffInSeconds / (60 * 60 * 24 * 365));
  let remainingSeconds = diffInSeconds - years * (60 * 60 * 24 * 365);

  let months = Math.trunc(remainingSeconds / (60 * 60 * 24 * 30));
  remainingSeconds -= months * (60 * 60 * 24 * 30);

  let days = Math.trunc(remainingSeconds / (60 * 60 * 24));
  remainingSeconds -= days * (60 * 60 * 24);

  let hours = Math.trunc(remainingSeconds / (60 * 60));
  remainingSeconds -= hours * (60 * 60);

  let minutes = Math.trunc(remainingSeconds / 60);
  remainingSeconds -= minutes * 60;

  let seconds = Math.trunc(remainingSeconds);

  // Store the calculated elapsed time in the result object
  result.years = years;
  result.months = months;
  result.days = days;
  result.hours = hours;
  result.minutes = minutes;
  result.seconds = seconds;

  return result;
}

/**
 * Pluralizes a given word based on the quantity provided.
 *
 * @param {string} item - The word to be pluralized.
 * @param {number} quantity - The quantity to determine whether the word should be pluralized.
 *
 * @returns {string} - The pluralized word. If the quantity is greater than 1, the word is pluralized by appending 's'.
 *                     Otherwise, the word remains unchanged.
 */
pluralize(item, quantity) {
  // Check if the quantity is greater than 1
  if (quantity > 1) {
    // Append 's' to the word to make it plural
    return `${item}s`;
  } else {
    // Return the word as it is (singular)
    return `${item}`;
  }
}

/**
 * Splits a given string into an array of substrings using a specified separator.
 * Empty substrings and leading/trailing whitespaces are removed.
 *
 * @param {string} str - The input string to be split.
 * @param {string} spl - The separator to use for splitting the input string.
 *
 * @returns {string[]} - An array of substrings after splitting the input string.
 *                       Empty substrings and leading/trailing whitespaces are excluded.
 */
spliter(str, spl) {
  if (str === undefined || spl === undefined) return [];

  // Split the input string using the specified separator
  const substrings = str.split(spl);

  // Filter out empty substrings and remove leading/trailing whitespaces from each substring
  const result = substrings.filter((string) => string !== "").map((st) => st.trim());

  return result;
}

/**
 * Cleans up a string by removing leading/trailing whitespaces and extra spaces between words.
 *
 * @param {string} string - The input string to be cleaned.
 *
 * @returns {string} - The cleaned string with no leading/trailing whitespaces and extra spaces between words.
 */
clean(string) {
  // Split the input string by spaces
  const words = string.split(" ");

  // Filter out any empty strings and remove leading/trailing whitespaces from each word
  const cleanedWords = words.filter((str) => str !== "").map((str) => str.trim());

  // Join the cleaned words back together with a single space in between
  const cleanedString = cleanedWords.join(" ");

  return cleanedString;
}

/**
 * Calculates the time elapsed from the given date up to the current date and time.
 *
 * @param {Date|string} date - The date to calculate the elapsed time from. It can be a Date object or a string representation of a date.
 *
 * @returns {Object} - An object containing the time elapsed in years, months, days, hours, minutes, and seconds.
 */
onfromthelasttime(date) {
  // If the input date is not a Date object, attempt to convert it to one
  const startDate = typeof date === "string" ? new Date(date) : date;

  // Get the current date and time
  const endDate = new Date();

  // Calculate the time elapsed between the start date and end date using the elapsed function
  return elapsed(startDate, endDate);
}


/**
 * Provides autocompletion for a given line based on a list of predefined completions.
 *
 * @param {string} line - The input line for which autocompletion is required.
 *
 * @returns {Array} - An array containing two elements: an array of matching completions and the input line.
 */
completer(line) {
  // List of predefined completions
  const completions = ".help .error .exit .quit .q".split(" ");

  // Filter completions based on those that start with the input line
  const hits = completions.filter((c) => c.startsWith(line));

  // If there are matching completions, return them; otherwise, return all completions
  return [hits.length ? hits : completions, line];
}

/**
 * Registers common event listeners for the current context.
 * This function listens for specific events and performs actions accordingly.
 */
common() {
  // Event listener for the "clear" event
  this.on("clear", () => {
    // Clears the console output
    console.clear();
  });

  // Event listeners for the "exit", "leave", and "quit" events
  this.on("exit", () => {
    // Closes the current context (process, session, etc.)
    this.close();
  });
  this.on("leave", () => {
    // Closes the current context (process, session, etc.)
    this.close();
  });
  this.on("quit", () => {
    // Closes the current context (process, session, etc.)
    this.close();
  });
}

/**
 * Registers event listeners to handle invalid commands and error events.
 * This function listens for specific events related to command errors and displays appropriate messages.
 */
invalidCommand() {
  // Event listener for the "command-not-found" event
  this.on("command-not-found", (data) => {
    console.log();
    console.log(`\x1b[31m${data.error}\x1b[0m`);
    console.log();
    // Uncomment the following line if you want to display the prompt after the error message
    // this.prompt();
    // Uncomment the following line if you want to exit the current context after the error message
    // process.exit(0)
  });

  // Event listener for the "error" event
  this.on("error", (data) => {
    console.log();
    console.log(`\x1b[31m${data.error}\x1b[0m`);
    console.log();
    // Uncomment the following line if you want to display the prompt after the error message
    // this.prompt();
    // Uncomment the following line if you want to exit the current context after the error message
    // process.exit(0)
  });

  // Event listener for the "success" event
  this.on("success", (data) => {
    console.log(`\x1b[36m${data.message}\x1b[0m`);
  });
}


/**
 * Displays information about the given object using util.inspect function.
 * @param {any} object - The object to display information for.
 * @param {number} depth - The depth to which nested objects are inspected (default is 1).
 */
infos(object, depth = 1) {
  // Utilizes util.inspect to display information about the object
  console.log(
    util.inspect(object, {
      showHidden: true, // Show non-enumerable properties
      colors: true, // Enable colors for output
      depth: depth, // Set the depth to which nested objects are inspected
    })
  );
}

/**
 * Generates a simple usage message for a given command.
 * @param {string} command - The name of the command to display in the usage message.
 * @returns {string} - The generated usage message as a formatted string.
 */
usage(command) {
  return `
  ----------------------------------------------------
  |${command}----------------------------------------------------`;
}


/**
 * Adds default properties to the current object if they are not already defined.
 * @function
 */
addDefault() {
  /**
   * Sets the `createWriteStream` property to the `createWriteStream` function if not already defined.
   * @type {function}
   */
  if (!this.createWriteStream) this.createWriteStream = createWriteStream;

  /**
   * Sets the `createReadStream` property to the `createReadStream` function if not already defined.
   * @type {function}
   */
  if (!this.createReadStream) this.createReadStream = createReadStream;

  /**
   * Sets the `promises` property to the `promises` object if not already defined.
   * @type {object}
   */
  if (!promises) this.promises = promises;
}


/**
 * An auto-invoked function that returns an array containing a single string value: "addDefault".
 * @function
 * @returns {Array} An array containing the string value "addDefault".
 */
autoinvoked() {
  /**
   * The array that contains a single string value "addDefault".
   * @type {Array}
   */
  return ["addDefault"];
}

}

module.exports = Migrate;
