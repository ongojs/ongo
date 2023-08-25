
'use strict';
const cmd = require('../../../cmd')();
const schema = require("./schema");
const migration = require("./migration");
const migrate = require("./migrate");
const {man,make, error, ModelCommand} = require('./model')();
const method = require("./method");
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
    
        const switches = (string = 'model') => (Observable = {}) => {
            switch (cmd.command(string, 1)) {
                case 'man':
                    man(string);
                    break;
                case '--man':
                    man(string);
                    break;
                case '--help':
                    man(string);
                    break;
                case 'help':
                    man(string);
                    break;
                case '-h':
                    man(string);
                    break;
                case '?':
                    man(string);
                    break;
                case 'models':
                    new ModelCommand().list();
                    break;
                case 'make:model':
                    cmd.command(string, 2) ? make(string)(2) : error('make:model')('command requires an argument: the name of the model to make!');
                    break;
                case 'make:schema':
                    schema(string)
                    break;
                case 'make:migration':
                    migration(string);
                    break;
                case 'migrate':
                    migrate(string);
                    break;
                case 'method':
                    method(string);
                    break;
                default:
                    error('prompt error: ')(`invalid option for  ${Observable.getPrompt()}  prompt`);
                    break
            }
        }

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the switches object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = switches;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.switches.
    |
    */

    else global.switches = switches;
})(this)