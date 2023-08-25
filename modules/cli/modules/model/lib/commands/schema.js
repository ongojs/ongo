'use strict';
const cmd = require('../../../cmd')();
const Schema = require("../../../../../schema");
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
        const makeSchema = (string = '') => (index = '2') => new Schema({command: cmd.command(string, index)}).makeSchema
        const hasType = (string = '') => (index = '2') => new Schema({command: cmd.command(string, index)}).hasType


        // const  {makeSchema, hasType} =  new Schema({command: this.command(2)})
        // if(this.command(4)){
        //     if(hasType(this.command(4))){
        //       makeSchema(this.command(3), this.command(4));
        //     }else{
        //       console.log(`invalid argument for make:schema ${this.command(3)}`);
        //     }
          
        // }else{
        //   makeSchema(this.command(3));
        // }
        const schema = string => {

            if(cmd.command(string, 1)){
                cmd.command(string, 2) ? 
                makeSchema(string)(2)(cmd.command(string, 2), cmd.command(string, 3)) : 
                error('make:schema')('command requires a valid argument');
            }else if (cmd.command(string, 2)) {
                if(cmd.command(string, 2).startsWith('--schema=')){
                    makeSchema(string)(2)(cmd.command(string, 2), cmd.command(string, 3))
                }else{
                    switch (cmd.command(string, 2)) {
                        case '--schema':
                            console.log('hey')
                            cmd.command(string, 3) ? 
                                makeSchema(string)(3)(cmd.command(string, 3), cmd.command(string, 4)) : 
                                error('make:schema')('command requires a valid argument');
                            break;
                        case '-s':
                            cmd.command(string, 3) ? 
                            makeSchema(string)(3)(cmd.command(string, 3), cmd.command(string, 4)) : 
                            error('make:schema')('command requires a valid argument');
                            break;
                        default:
                            error('make:schema....')('command requires a valid argument')
                            break;
                    }
                }
               
            } else {
                error('make:schema')('command requires an argument')
            }
        }
    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the schema object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = schema;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.schema.
    |
    */

    else global.schema = schema;
})(this)