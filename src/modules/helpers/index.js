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
const regex = require('./src/regex')();
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
 * @name isRegexValid
 * @function
 * 
 * @param {RegExp} regex the regest to be tested against a string
 * @param {String} input the string to be tested against the regex
 * 
 * @description tests a string against a regex
 * 
 * @return {Boolean} the test result: true of the the matches the regex; false otherwise
 * 
 */
  /**
  * Check if the given input matches the provided regular expression.
  *
  * @function isRegexValid
  * @param {RegExp} regex - The regular expression to test against the input.
  * @param {string} input - The input string to be tested.
  * @returns {boolean} Returns true if the input matches the regular expression, otherwise returns false.
  */
  const isRegexValid = (regex, input) => regex.test(input);


  /**
 * Check if the given input is valid based on the specified field's regular expression.
 *
 * @function isValid
 * @param {string} fieldName - The name of the field whose regular expression to use for validation.
 * @param {string} input - The input string to be validated against the specified regular expression.
 * @returns {boolean} Returns true if the input is valid based on the field's regular expression, otherwise returns false.
 */
  const isValid = (fieldName = 'email', input) => isRegexValid(regex[fieldName], input);

  /**
   * Check if the given value is an object.
   *
   * @function isObject
   * @param {any} object - The value to be checked if it is an object.
   * @returns {boolean} Returns true if the value is an object, otherwise returns false.
   */
  const isObject = (object = {}) => Object.prototype.toString.call(object) === '[object Object]';

  /**
   * Check if the given value is a boolean.
   *
   * @function isBoolean
   * @param {any} object - The value to be checked if it is a boolean.
   * @returns {boolean} Returns true if the value is a boolean, otherwise returns false.
   */
  const isBoolean = (object = {}) => Object.prototype.toString.call(object) === '[object Boolean]';

  /**
   * Check if the given value is an array.
   *
   * @function isArray
   * @param {any[]} array - The value to be checked if it is an array.
   * @returns {boolean} Returns true if the value is an array, otherwise returns false.
   */
  const isArray = (array = []) => Object.prototype.toString.call(array) === '[object Array]';
  /**
   * Check if the given value is a string.
   *
   * @function isString
   * @param {string} string - The value to be checked if it is a string.
   * @returns {boolean} Returns true if the value is a string, otherwise returns false.
   */
  const isString = (string = 'string') => Object.prototype.toString.call(string) === '[object String]';

  /**
   * Checks if the input is a number.
   *
   * @function isNumber
   * @param {number} number - The input to be checked for being a number.
   * @returns {boolean} Returns true if the input is a number, otherwise false.
   */
  const isNumber = (number = 12) => Object.prototype.toString.call(number) === '[object Number]';

  /**
   * Checks if the input is a valid MongoDB ObjectId.
   *
   * @function isValidObjectId
   * @param {string} id - The input to be checked for being a valid MongoDB ObjectId.
   * @returns {boolean} Returns true if the input is a valid ObjectId, otherwise false.
   */
  const isValidObjectId = (id = '635919e22bc9cdd44701ee82') => /^[0-9a-fA-F]{24}$/.test(id);

  /**
   * Creates the default storage directory and its subdirectory if they don't exist.
   *
   * @function defaultStorageDirectory
   * @param {string} path - The subdirectory path to be created inside the base storage directory.
   * @param {string} base - The base storage directory where the subdirectory will be created.
   */
  const defaultStorageDirectory = (path = '', base = process.cwd() + '/storage') => {
    const fs = require('fs');
    const pathModule = require('path');

    // Check if the base storage directory exists, if not, create it
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base);
    }

    // Check if the subdirectory inside the base storage directory exists, if not, create it
    const subdirectoryPath = pathModule.join(base, path);
    if (!fs.existsSync(subdirectoryPath)) {
      fs.mkdirSync(subdirectoryPath);
    }
  };

  /**
   * Checks if a file exists at the specified file path.
   *
   * @function fileExists
   * @param {string} filePath - The file path to check for existence.
   * @returns {boolean} Returns true if the file exists, otherwise returns false.
   */
  const fileExists = filePath => {
    const fs = require('fs');
    return fs.existsSync(filePath);
  };


  //   const checkPortNumbers = string => string.endsWith('27017') || string.endsWith('27018') || string.endsWith('27019');
  //   const checkHostString = string => string.startsWith('localhost:') || string.startsWith('127.0. 0.1:')
  //   const urlArray = url => url.split('/').filter(el => el.trim().length !== 0);
  //   const isUrlArrayLengthOK = url => urlArray(url).length  === 3
  //   const checkNetworkString = string => checkHostString(string) && checkPortNumbers(string);
  //   const isUrlLocalhost = url => isUrlArrayLengthOK(url) ? urlArray(url).find(el => checkNetworkString(el) ) !== undefined : false

  // const getDatabaseNameFromUrl = url => url.split('/').filter(el => el.trim().length !== 0).pop()



  /**
   * Check if the given string ends with specific port numbers (27017, 27018, or 27019).
   *
   * @function checkPortNumbers
   * @param {string} string - The string to be checked for the presence of specific port numbers.
   * @returns {boolean} Returns true if the string ends with any of the specified port numbers (27017, 27018, or 27019), otherwise returns false.
   */
  const checkPortNumbers = string => string.endsWith('27017') || string.endsWith('27018') || string.endsWith('27019');

  /**
   * Check if the given string starts with 'localhost:' or '127.0.0.1:'.
   *
   * @function checkHostString
   * @param {string} string - The string to be checked for the presence of 'localhost:' or '127.0.0.1:'.
   * @returns {boolean} Returns true if the string starts with 'localhost:' or '127.0.0.1:', otherwise returns false.
   */
  const checkHostString = string => string.startsWith('localhost:') || string.startsWith('127.0.0.1:');

  /**
   * Split the given URL string by '/' and filter out empty elements from the resulting array.
   *
   * @function urlArray
   * @param {string} url - The URL string to be split and filtered.
   * @returns {string[]} Returns an array containing non-empty elements after splitting the URL string by '/'.
   */
  const urlArray = url => url.split('/').filter(el => el.trim().length !== 0);

  /**
   * Check if the length of the URL array is equal to 3.
   *
   * @function isUrlArrayLengthOK
   * @param {string} url - The URL string to be split and checked.
   * @returns {boolean} Returns true if the length of the URL array is 3, otherwise returns false.
   */
  const isUrlArrayLengthOK = url => urlArray(url).length === 3;

  /**
   * Check if a network string is valid, containing a valid host and port number.
   *
   * @function checkNetworkString
   * @param {string} string - The network string to be checked.
   * @returns {boolean} Returns true if the network string is valid, otherwise returns false.
   */
  const checkNetworkString = string => checkHostString(string) && checkPortNumbers(string);

  /**
   * Check if a URL contains a valid localhost network string.
   *
   * @function isUrlLocalhost
   * @param {string} url - The URL to be checked.
   * @returns {boolean} Returns true if the URL contains a valid localhost network string, otherwise returns false.
   */
  const isUrlLocalhost = url => isUrlArrayLengthOK(url) ? urlArray(url).find(el => checkNetworkString(el)) !== undefined : false;

  /**
   * Extract the database name from a URL.
   *
   * @function getDatabaseNameFromUrl
   * @param {string} url - The URL from which the database name needs to be extracted.
   * @returns {string} The extracted database name from the URL.
   */
  const getDatabaseNameFromUrl = url => url.split('/').filter(el => el.trim().length !== 0).pop();


  /**
   * Returns an object containing various helper functions.
   *
   * @function helpers
   * @returns {Object} An object containing the following helper functions:
   *   - isValid: Check if the input matches the specified regular expression.
   *   - isObject: Check if the input is an object.
   *   - isArray: Check if the input is an array.
   *   - isString: Check if the input is a string.
   *   - isNumber: Check if the input is a number.
   *   - isValidObjectId: Check if the input is a valid MongoDB ObjectID.
   *   - defaultStorageDirectory: Get the default storage directory path.
   *   - fileExists: Check if a file exists at the specified path.
   *   - isUrlLocalhost: Check if the URL is pointing to a localhost address.
   *   - getDatabaseNameFromUrl: Extract the database name from a URL.
   *   - isBoolean: Check if the input is a boolean value.
   */
  const helpers = () => ({
    isValid,
    isObject,
    isArray,
    isString,
    isNumber,
    isValidObjectId,
    defaultStorageDirectory,
    fileExists,
    isUrlLocalhost,
    getDatabaseNameFromUrl,
    isBoolean,
  });


  /*
  |----------------------------------------------------------------------------------
  | EXPORTS MODULE IN NODEJS ENVIRONMENTS
  |----------------------------------------------------------------------------------
  |
  | The module is exported using an if/else statement. If the module object is defined and
  | has an exports property, then the module is being used in Node.js and we export 
  | the helpers object by assigning it to module.exports
  |
  |
  */

  if (typeof module !== 'undefined' && module.exports) module.exports = helpers;

  /*
  |----------------------------------------------------------------------------------------
  | EXPORT MODULE IN BROWSER ENVIRONMENTS
  |----------------------------------------------------------------------------------------
  |
  | If module is not defined or does not have an exports property, then the module is being used
  | in the browser and we attach the myModule object to the global object (which is the window object
  | in the browser) by assigning it to global.helpers.
  |
  */

  else global.helpers = helpers;
})(this)