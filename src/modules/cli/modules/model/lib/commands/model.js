'use strict';
const cmd = require('../../../cmd')();
const Man = require('../../../../../man');
const Model = require('../../../../../../lib/command/cli');
const couleurs = require('../../../../../couleurs')();
const {ModelCommand} = require('../../../../../../lib')().Commands();
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
    
    const man = (string = 'model') => new Man({ command: cmd.command(string, 1) }).man("man");
    const manCommand = (string ='model') => (index = 1) => (method = 'man') => (argument = 'man') => new Man({ command: cmd.command(string, index) })[method](argument); 
    const make = (string = 'model') => (index  = 2) =>  new Model({ command: cmd.command(string, index) }).make(cmd.command(string, index));
    const error  = (command = '') => (message = 'error') =>  console.log(couleurs.FgRed(`'${command}' ${message}`));

    const model = () => ({
        make, man, error, ModelCommand
    })

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the model object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = model;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.model.
    |
    */

    else global.model = model;
})(this)