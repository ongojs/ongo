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


'use strict';
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
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
    /**
     * DotEnv class for handling environment variables from a .env file.
     */
    class DotEnv {
        /**
         * Constructs a new instance of the DotEnv class.
         *
         * @param {...Object} arrayOfObjects - Additional objects containing options to be assigned to the model.
         */
        constructor(...arrayOfObjects) {
            /**
             * Constructs a new instance of the Model class.
             *
             * @param {...Object} arrayOfObjects - Additional objects containing options to be assigned to the model.
             */

            // Assign additional options to the model
            arrayOfObjects.forEach(option => {
                if (Object.keys(option).length > 0) {
                    Object.keys(option).forEach((key) => {
                        if (!this[key]) this[key] = option[key];
                    });
                }
            });
        }

        /**
         * Configures the environment variables by reading a .env file.
         */
        static config() {
            if (!existsSync(join(process.cwd(), '.env'))) return;
            try {
                const dataArray = readFileSync(join(process.cwd(), '.env'), 'utf8').split('\n').filter(el => el.trim().length > 0);
                for (let line of dataArray) {
                    if (! process.env[`${line.split('=')[0]}`]) {
                        process.env[`${line.split('=')[0]}`] = Array.from(line.split('=')[1]).filter(el => el !== "'" && el !== `"`).join('');
                       
                    }
                }
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    }


    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the DotEnv object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = DotEnv;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.DotEnv.
    |
    */

    else global.DotEnv = DotEnv;
})(this)