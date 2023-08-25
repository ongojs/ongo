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
// const exec = util.promisify(require("child_process").exec);
// const path = require("path");

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
    
        /*
        |----------------------------------------------------------------------------------
        |  YOUR CODE STARTS HERE
        |----------------------------------------------------------------------------------
        |
        */
    
        const isNumber = (str) => {
            return !isNaN(str) === true ? true : false;
        }
        const isNotNumber = (str)  =>{
            return isNaN(str) === true ? true : false;
        }
       const regexes = () => {
            const phoneregex = /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm;
            const hregex = /^[1-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm;
            const mregex = /^[1-5]?[0-9]?$/gm;
            const dregex = /^(3[0]|[12][0-9]|[1-9])$/gm;
            const Mregex = /^(1[0-1]|[1-9])$/gm;
            const yregex = /^[0-9]?[0-9]$/gm;
            const Dregex = /^[0-9]?[0-9]$/gm;
            const jsonregex = /^[0-9]?[0-9]$/gm;
            const emailregex =
                /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm;
            // positive number including zero
            const positivenumber = /^(0|[1-9][0-9]{0,9})$/gm;
            // positive number greater than zero
            const greaterthanzero = /^[1-9][0-9]*$/gm;
            const number = /-?[0-9]{0,10}/gm;
            const passwordregex =
                /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm;
    
            return {
                hregex,
                mregex,
                dregex,
                Mregex,
                yregex,
                Dregex,
                jsonregex,
                phoneregex,
                emailregex,
                positivenumber,
                greaterthanzero,
                number,
                passwordregex,
            };
        }
        const validate = (regex, string) => {
            return regex.test(string);
        }
        const isValid = (regex, string) => {
            return this.validate(regex, string) === true ? true : false;
        }
    
        const onarraywalk = (searchIn, searchFor, number = false) => {
            let result = new Set();
            for (let option of searchFor) {
                if (searchIn.includes(option)) {
                    result.add(option);
                }
            }
    
            let tempresult = Array.from(result).filter((str) => str !== undefined);
            let noNumber = tempresult.filter((str) => Number.isNaN(str));
    
            return number === true ? noNumber : tempresult;
        }
    
        const exclude = (searchIn, searchFor, number = false) => {
            let result = new Set();
            for (let option of searchFor) {
                if (!searchIn.includes(option)) {
                    result.add(option);
                }
            }
    
            let tempresult = Array.from(result).filter((str) => str !== undefined);
    
            let noNumber = tempresult.filter((str) => Number.isNaN(str));
            return number === true ? noNumber : tempresult;
        }
        const objectCopy = (obj) => {
            let copy = Object.create(Object.getPrototypeOf(obj));
            Object.getOwnPropertyNames(obj).forEach((name) => {
                Object.defineProperty(
                    copy,
                    name,
                    Object.getOwnPropertyDescriptor(obj, name)
                );
            });
            return copy;
        }
        const matchFinder = (searchIn = [], searchFor = []) => {
            if (!Array.isArray(searchIn) || !Array.isArray(searchFor)) return;
    
            let found = [];
    
            for (let sin of searchIn) {
                for (let sfor of searchFor) {
                    if (sin.match(RegExp(sfor))) {
                        found.push(sin);
                    }
                }
            }
            return found;
        }
        /**
         * @name promisify
         * @function
         *
         * @param {Function|Object} fn the function or object to be promisified
         *
         * @description promisified functions or objects
         * @return {Function|Object} fn, the promisified function
         *
         */
       const  promisify = (fn)  => {
            return (...args) =>
                new Promise(
                    (resolve, reject) => fn(...args),
                    (err, data) => (err ? reject(err) : resolve(data))
                );
        }
    
        /**
         * @name getField
         * @function
         *
         * @param {String|Object} attribute the attribute to extract
         *
         * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
         *
         * @return {Function|Object} object, the function that will be able to extract an attribute from an object
         *
         */
        const getField = (attribute) => {
            return (object) => object[attribute];
        }
    
        /**
         * @name pluckOff
         * @function
         *
         * @param {Function|Object} fn  the function to bind to object method
         *
         * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
         *
         *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
         *
         * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
         *
         * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
         *
         */
    
        const pluckOff = (fn) => {
            return (...args) => fn.bind(...args)();
        }
        /**
           * @name callOnlyNTimes
           * @function
           *
           * @param {Function|Object} f the function to be called only n times
        
           * @param {Number} n number of time the function f() should be called
           *  
           * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
           * 
           * @return {Function|Object} a function that calls fn() only n times
           * 
           */
        const callOnlyNTimes = (fn, n = 1) => {
            let done = false;
            return (...args) => {
                if (!done) {
                    done = true;
                    for (let i = 0; i < Math.abs(n); i++) {
                        fn(...args);
                    }
                }
            };
        }
    
        /**
         * @name callFirstOnlyNTimes
         * @function
         *
         * @param {Function|Object} f the function to be called only n times
         * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
         * @param {Number} n number of time the function f() should be called
         *
         * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
         *
         * @return {Function|Object} a function that calls fn() only n times and g() afterward
         *
         */
        const callFirstOnlyNTimes = (f = () => { }, g = () => { }, n = 1)  => {
            let done = false;
            return (...args) => {
                if (!done) {
                    done = true;
                    if (typeof n !== "number" || n % 1 !== 0) {
                        f(...args);
                    } else {
                        for (let i = 1; i <= Math.abs(n); i++) {
                            f(...args);
                        }
                    }
                } else {
                    g(...args);
                }
            };
        }
    
        /**
         * @name inputsValid
         * @function
         *
         * @param {Function} arr  the array to validate
         * @param {Function} fn  the call back function to validate
         * @param {Number} flat arr flattening depth to validate
         *
         * @description validates inputs
         *
         * @return {Boolean} true if inputs are valid and false if inputs are invalid
         *
         */
       const  inputsValid = (arr = [], fn = () => { }, flat = 1) => {
            if (!Array.isArray(arr)) return false;
            if (typeof fn !== "function") return false;
            if (
                typeof flat !== "number" ||
                flat < 0 ||
                (flat % 1 !== 0 && flat !== Infinity)
            )
                return false;
            return true;
        }
    
        /**
         * @name none
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {Function|Object} fn the predicate
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description filters an array
         *
         * @return {Array|Object} array, the filtered array for which the predicate is true
         *
         */
        const none = (arr = [], fn = () => false, flat = 0) => {
            return this.inputsValid(arr, fn, flat)
                ? arr.flat(flat).every((v) => !fn(v))
                : false;
        }
    
        /**
         * @name forEachAsync
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {Function|Object} fn the callback function
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description asynchronously  loops an array
         *
         * @return {Promise}  a promise if promise is fulfilled and successfull
         *
         */
        const forEachAsync = (arr = [], fn = () => false, flat = 0) => {
            if (this.inputsValid(arr, fn, flat)) {
                return arr
                    .flat(flat)
                    .reduce(
                        (promise, value) => promise.then(() => fn(value)),
                        Promise.resolve()
                    );
            } else {
                return undefined;
            }
        }
    
        /**
         * @name mapAsync
         * @function
         *
         * @param {Array|Object} arr the array to loop throug
         * @param {Function|Object} fn the callback function
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description asynchronously  maps an array
         *
         * @return {Promise}  a promise if promise is fulfilled and successfull
         *
         */
        const mapAsync = (arr = [], fn = () => [], flat = 0)  => {
            return this.inputsValid(arr, fn, flat)
                ? Promise.all(arr.flat(flat).map(fn))
                : [];
        }
    
        /**
         * @name filterAsync
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {Function|Object} fn the callback function
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description asynchronously  filters an array
         *
         * @return {Promise}  a promise if promise is fulfilled and successfull
         *
         */
    
        const filterAsync  = async (arr = [], fn = () => [], flat = 0) => {
            if (this.inputsValid(arr, fn, flat)) {
                return this.mapAsync(fn, flat).then((array) =>
                    arr.flat(flat).filter((v, i) => Boolean(array[i]))
                );
            } else {
                return [];
            }
        }
    
        /**
         * @name reduceAsync
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {Function|Object} fn the callback function
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description asynchronously  reduces an array
         *
         * @return {Promise}  a promise if promise is fulfilled and successfull
         *
         */
    
        const reduceAsync = async (arr = [], fn = () => { }, init, flat = 0) => {
            if (this.inputsValid(arr, fn, flat)) {
                return Promise.resolve(init).then((accumulator) =>
                    this.forEachAsync(arr.flat(flat), async (v, i) => {
                        accumulator = fn(accumulator, v, i);
                    }).then(() => accumulator)
                );
            } else {
                return 0;
            }
        }
        /**
         * @name filter
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {Function|Object} fn the call back function
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description filters an array
         *
         * @return {Array|Object} array, the filtered array
         *
         */
       const  filtered = (arr = [], fn = () => [], flat = 1)  => {
            return this.inputsValid(arr, fn, flat)
                ? arr.flat(flat).filter((x) => fn(x))
                : [];
        }
    
        /**
         * @name filterItems
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {String} query any fitlering query
         *
         * @description asynchronously read a query and filter arrays according to the query
         *
         * @return {Array}  the query filtered array
         *
         */
        const filterItems = (query, arr = []) => {
            if (!Array.isArray(arr)) return [];
            return arr.filter(
                (el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1
            );
        }
    
        /**
         * @name some
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the predicate
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description filters an array according to the thruthiness of the predicate
         *
         * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
         *
         */
        const some = (arr = [], fn = () => false, flat = 0) => {
            return this.inputsValid(arr, fn, flat)
                ? arr.flat(flat).reduce((x, y) => x || fn(y), false)
                : false;
        }
    
        /**
         * @name every
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the predicate
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description filters an array according to the thruthiness of the predicate
         *
         * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
         *
         */
        const every = (arr = [], fn = () => false, flat = 0) => {
            if (this.inputsValid(arr, fn, falt)) {
                let result = [];
                arr
                    .flat(flat)
                    .reduce(
                        (x, y) => (x === false && fn(y) ? result.push(y) : result.pop()),
                        false
                    );
                return result.length === arr.flat(flat).length ? true : false;
            } else {
                return false;
            }
        }
    
        /**
         * @name forEach
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the call back funcction
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description performs fn() operation for each of the array elements
         *
         * @return {Function|Object} the resulting object or array or element from the fn() operation
         *
         */
    
        const forEach = (arr = [], fn = () => false, flat = 0) => {
            if (this.inputsValid(arr, fn, flat)) {
                for (let i = 0; i < arr.flat(flat).length; i++) {
                    fn(arr.flat(flat)[i]);
                }
            } else {
                return undefined;
            }
        }
    
        /**
         * @name filter
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the call back funcction
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description filters an array according to the thruthiness of the predicate
         *
         * @return {Array} the resulting array
         *
         */
    
        const filter = (arr = [], fn = () => false, flat = 0) => {
            if (this.inputsValid(arr, fn, flat)) {
                let result;
                result = [];
                for (let i = 0; i < this.flat(flat).length; i++) {
                    fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
                }
                return result.length > 0 ? result : [];
            } else {
                return [];
            }
        }
    
        /**
         * @name flatten
         * @function
         *
         * @param {Array} arr the array to flatten
         *
         * @description filten an array to whatsover depth or level it has
         *
         * @return {Array} the resulting flattened array
         *
         */
    
        const flatten  = (arr = []) => {
            const result = [];
            arr.forEach((el) =>
                Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)
            );
            return result;
        }
    
        /**
         * @name findIndex
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the call back funcction
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description find the index of an array element
         *
         * @return {Array} the resulting array element
         *
         */
        const findIndex = (arr = [], fn = () => false, flat = 0) =>  {
            return this.inputsValid(arr, fn, flat)
                ? arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1)
                : undefined;
        }
    
        /**
         * @name map
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the call back function
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description maps each element with the resulting operation of the callback function
         *
         * @return {Array} the resulting array
         *
         */
        const map = (arr = [], fn = () => [], flat = 0) => {
            return this.inputsValid(arr, fn, flat)
                ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), [])
                : [];
        }
    
        /**
         * @name find
         * @function
         *
         * @param {Array} arr the array to filter
         * @param {Function} fn the predicate
         * @param {Number} flat  the array to filter flattening depth
         *
         * @description find the first array element for which the predicate is true
         *
         * @return {Array} the resulting array element
         *
         */
        const find = (arr = [], fn = () => false, flat = 0) => {
            return this.inputsValid(arr, fn, flat)
                ? arr
                    .flat(flat)
                    .reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined)
                : undefined;
        }
   
        const helpers = () => ({})


        /*
        |----------------------------------------------------------------------------------
        | YOUR CODE END HERE
        |----------------------------------------------------------------------------------
        |
        */


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
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = helpers;

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