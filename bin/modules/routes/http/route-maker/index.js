'use strict'
const MakeHTTPRoute = require('../../../../../src/modules/http-route-maker');
const { Red } = require('../../../../../src/modules/couleurs')();
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
    
        const HTTPRouteMaker = (fnCommand = () => {}) => {
            switch (fnCommand(3)) {
                case "route":
                  const { make, makeWith } = new MakeHTTPRoute({ command: fnCommand(3) });
                  if (fnCommand(4)) {
                    if (fnCommand(5)) {
                      makeWith(fnCommand(4), fnCommand(5));
                    } else {
                      make(fnCommand(4));
                    }
                  } else {
                    //console.log(Red("invalid make route command"));
                  }
                  break;
                default:
                  //console.log(Red("invalid route command ..."));
                  break;
              }
        }


    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the HTTPRouteMaker object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = HTTPRouteMaker;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.HTTPRouteMaker.
    |
    */

    else global.HTTPRouteMaker = HTTPRouteMaker;
})(this)