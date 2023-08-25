'use strict';

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
     * Provides a collection of regular expressions for various data validation patterns.
     *
     * @function regex
     * @returns {Object} An object containing regular expressions for data validation.
     */
    const regex = () => ({
        phone: /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm,
        // password: /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm,
        // passwordConfirmation: /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm,
        firstname: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
        lastname: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
        username: /^[A-Za-z.'\-].{0,25}\S*$/gm,
        nickname: /^[A-Za-z.'\-].{0,25}\S*$/gm,
        email: /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm,
        subject: /^([a-zA-Z0-9_.\ -?!]).{0,100}$/gm,
        email2: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm,
        // Amex Card 
        amexNumber: /^3[47][0-9]{2}([\- ]?)[0-9]{6}([\- ]?)[0-9]{5}$/gm,
        amexSecurityCode: /^[0-9]{4}$/gm,
        amexNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
        amexExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
        // Visa Card 
        visaNumber: /^(?:4000)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/gm,
        visaSecurityCode: /^[0-9]{3}$/gm,
        visaNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
        visaExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
        // Master Card
        masterNumber: /^(?:5100)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/gm,
        masterSecurityCode: /^[0-9]{3}$/gm,
        masterNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
        masterExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
        // Discover
        discoverNumber: /^(?:6011)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/gm,
        discoverSecurityCode: /^[0-9]{3}$/gm,
        discoverNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
        discoverExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,

        // Zip Code 
        zip: '',
        // city 
        city: '',
        // State
        state: '',
        // Country
        country: /^USA$/gm
    });



    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the regex object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = regex;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.regex.
    |
    */

    else global.regex = regex;
})(this)