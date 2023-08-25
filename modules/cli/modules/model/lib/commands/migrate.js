 
  'use strict';
  const cmd = require('../../../cmd')();
  const Migrate = require("../../../../../db-migrate");
  const couleurs = require('../../../../../couleurs')();
/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| The function is wrapped in an immediately invoked function expression (IIFE),
| which allows the module to have its own private scope and prevent any variable conflicts with other code.
| 
| The global variable is passed as a parameter to the function. In the browser,
| the global variable refers to the window object, while in Node.js it refers to the global scope.
|
*/

(global => {

    /*
    |----------------------------------------------------------------------------------
    | MODULE DEFINITION
    |----------------------------------------------------------------------------------
    |
    | The module is defined as an object or a function.

    |
    */
    

        const error  = (command = '') => (message = 'error') =>  console.log(couleurs.FgRed(`'${command}' ${message}`));
        const migrate = string  => {
            if(cmd.command(string, 2)){
                const migrator = new Migrate({command: cmd.command(string, 2)})
                if(cmd.command(string, 2).startsWith('--schema=')){
                    migrator.schemaMigration(cmd.command(string, 2))
                    migrator.migrationMigration(cmd.command(string, 2))
                }else{
                    error('make:migration')('command requires a valid argument')
                    // switch (cmd.command(string, 2)) {
                    //     case '--schema':
                    //         if(cmd.command(string, 3)){
                    //             const migrator = new Migrate({command: cmd.command(string, 3)})
                    //             migrator.schemaMigration(cmd.command(string, 3))
                    //             migrator.migrationMigration(cmd.command(string, 3))
                    //         }else{
                    //             error('make:migration')('command requires a valid argument')
                    //         }
                          
                    //         break;
                    //     case '-s':
                    //         cmd.command(string, 3) ? 
                    //         makeMigration(cmd.command(string, 3), cmd.command(string, 4)): 
                    //         error('make:migration')('command requires a valid argument')
                    //         break;
                    //     default:
                    //         error('make:migration')('command requires a valid argument')
                    //         break;
                    // }
                }
            }else{
                const allMigrator = new Migrate({command: cmd.command(string, 2)})
                allMigrator.migrateAll(cmd.command(string, 2))
            }
        }

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the migrate object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = migrate;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.migrate.
    |
    */

    else global.migrate = migrate;
})(this)