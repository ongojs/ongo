'use strict';
const cmd = require('../../../cmd')();
const Migration = require("../../../../../db-migration");
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
        const migration = string  => {
            if (cmd.command(string, 2)) {
                const  {makeMigration, hasType} =  new Migration({command: cmd.command(string, 2)})
                if(cmd.command(string, 2).startsWith('--schema=')){
                  makeMigration(cmd.command(string, 2), cmd.command(string, 3));
                }else{
                    switch (cmd.command(string, 2)) {
                        case '--schema':
                            cmd.command(string, 3) ? 
                            makeMigration(cmd.command(string, 3), cmd.command(string, 4)): 
                            error('make:migration')('command requires a valid argument')
                            break;
                        case '-s':
                            cmd.command(string, 3) ? 
                            makeMigration(cmd.command(string, 3), cmd.command(string, 4)): 
                            error('make:migration')('command requires a valid argument')
                            break;
                        default:
                            error('make:migration')('command requires a valid argument')
                            break;
                    }
                }
                
            } else {
                error('make:migration')('command requires a valid argument')
            }
        }

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the migration object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = migration;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.migration.
    |
    */

    else global.migration = migration;
})(this)