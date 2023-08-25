/**
 * Finds and retrieves the body of a method from a given class prototype.
 * It checks if the specified method exists in the prototype of the provided class.
 * If the method is found, its body (implementation) is retrieved and returned as a string.
 * If the method is not found, it returns `undefined`.
 *
 * @function findMethod
 * @param {string} method - The name of the method to find.
 * @param {Function} ClassName - The class whose prototype is to be checked for the method.
 * @returns {string|undefined} The body of the method as a string if found, or `undefined` if the method does not exist.
 */
const findMethod = (method = 'method', ClassName) => {
    // Check if the specified method exists in the prototype of the provided class
    if (Reflect.has(ClassName.prototype, method)) {
      // If the method is found, retrieve its body (implementation) and return as a string
      return Reflect.get(ClassName.prototype, method).toString();
    } else {
      // If the method is not found, return undefined
      return undefined;
    }
  };
  
/**
 * Finds and extracts the validator name from a given method string.
 * It searches for the '.validate' keyword in the method string and extracts
 * the validator name that follows the keyword up to the opening parenthesis.
 *
 * @function findValidator
 * @param {string} method - The method string from which to find the validator name.
 * @returns {string} The name of the validator if found, or an empty string if not found.
 */
const findValidator = (method = 'method') => {
    // Find the index where the '.validate' keyword starts in the method string
    let index = method.indexOf('.validate');
    let str = '';
    // Extract characters from the method string after the '.validate' keyword until the opening parenthesis is encountered
    for (let i = index; i < method.length; i++) {
      if (method[i] === '(') break;
      str += method[i];
    }
    // Return the extracted validator name, excluding the '.validate' keyword
    return str.slice(1);
  };
  
/**
 * Extracts and returns the method body string starting from the input method name
 * until the third dot ('.') is encountered in the given method string.
 *
 * @function colorMethodMethodBodyString
 * @param {string} methodString - The entire method string where the input method is present.
 * @param {string} inputMethod - The input method name to start extracting the method body.
 * @returns {string} The extracted method body string from the input method until the third dot ('.') is encountered.
 */
const colorMethodMethodBodyString = (methodString, inputMethod) => {
    // Find the index of the input method name in the method string
    let methodBodyIndex = methodString.indexOf(inputMethod);
    let methodBodyString = '';
    let dotCount = 0;
  
    // Extract characters from the method string starting from the input method name
    // until the third dot ('.') is encountered
    for (let i = methodBodyIndex; i < methodString.length; i++) {
      methodBodyString += methodString[i];
      if (methodString[i] === '.') {
        dotCount++;
      }
      if (dotCount >= 3) break;
    }
  
    return methodBodyString;
  };
  

/**
 * Extracts and returns the callback argument string of the input method from the given method string.
 *
 * @function colorMethodCallbackArgumentString
 * @param {string} methodString - The entire method string where the input method is present.
 * @param {string} inputMethod - The input method name to find its callback argument.
 * @returns {string} The extracted callback argument string of the input method.
 */
const colorMethodCallbackArgumentString = (methodString, inputMethod) => {
    // Find the index of the input method's callback argument in the method string
    let callbackArgumentIndex = methodString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
    let callbackArgumentString = '';
  
    // Extract characters from the method string starting from the callback argument index
    // until the first dot ('.') is encountered
    for (let i = callbackArgumentIndex; i < methodString.length; i++) {
      callbackArgumentString += methodString[i];
      if (methodString[i] === '.') break;
    }
  
    return callbackArgumentString;
  };
  

/**
 * Extracts and returns the validator argument string of the input method from the given method string.
 *
 * @function colorMethodValidatorArgumentString
 * @param {string} methodString - The entire method string where the input method is present.
 * @param {string} inputMethod - The input method name to find its validator argument.
 * @param {function} callback - The callback function used to find the input method.
 * @returns {string} The extracted validator argument string of the input method.
 */
const colorMethodValidatorArgumentString = (methodString, inputMethod, callback = Callback) => {
    // Find the method using the callback function and the input method
    const method = findMethod(inputMethod, callback);
  
    // If the method is not found or is undefined, return early
    if (!method || method === undefined) return;
  
    // Find the validator name from the method using findValidator()
    const validator = findValidator(method);
  
    // Find the index of the validator argument in the method string
    let validatorArgumentIndex = methodString.indexOf(validator) + validator.length;
    let validatorArgumentString = '';
  
    // Extract characters from the method string starting from the validator argument index
    // until the first closing curly brace ('}') is encountered
    for (let i = validatorArgumentIndex; i < methodString.length; i++) {
      validatorArgumentString += methodString[i];
      if (methodString[i] === '}') break;
    }
  
    return validatorArgumentString;
  };
  
/**
 * Applies color formatting to the method string based on different parts of the method.
 *
 * @function colorMethod
 * @param {string} inputMethod - The input method name for which to apply color formatting.
 * @param {function} callback - The callback function used to find the input method.
 * @param {function} callbackQuery - A callback query function (optional, defaults to CallbackQuery).
 * @param {function} callbackQueryValidator - A callback query validator function (optional, defaults to CallbackQueryValidator).
 * @returns {string} The method string with color formatting applied to different parts.
 */
const colorMethod = (
    inputMethod = 'method',
    callback = Callback,
    callbackQuery = CallbackQuery,
    callbackQueryValidator = CallbackQueryValidator
  ) => {
    // Find the method using the callback function and the input method
    const method = findMethod(inputMethod, callback);
  
    // If the method is not found or is undefined, return early
    if (!method || method === undefined) return;
  
    // Find the name of the validator from the method using findValidator()
    const validator = findValidator(method);
  
    // Get the method string and apply color formatting to the callback argument
    let methodString = method;
    let callbackArgumentString = colorMethodCallbackArgumentString(methodString, inputMethod);
    methodString = methodString.replace(callbackArgumentString, `\x1b[36m${callbackArgumentString}\x1b[0m`);
  
    // Get the method string and apply color formatting to the validator argument
    let validatorArgumentString = colorMethodValidatorArgumentString(methodString, inputMethod, callback);
    methodString = methodString.replace(validatorArgumentString, `\x1b[36m${validatorArgumentString}\x1b[0m`);
  
    // Get the method string and apply color formatting to the method body
    let methodBodyString = colorMethodMethodBodyString(methodString, inputMethod);
    methodString = methodString.replace(methodBodyString, `\x1b[36m${methodBodyString}\x1b[0m`);
  
    // Apply color formatting to the validator name
    methodString = methodString.replace(validator, `\x1b[33m${validator}\x1b[0m`);
  
    // Apply color formatting to the callback name
    methodString = methodString.replace(`${inputMethod}Callback`, `\x1b[32m${inputMethod}Callback\x1b[0m`);
  
    return methodString;
  };
  
/**
 * Applies color formatting to the method callback string based on different parts of the callback.
 *
 * @function colorMethodCallback
 * @param {string} inputMethod - The input method name for which to apply color formatting to the callback.
 * @param {function} callback - The callback function used to find the input method.
 * @param {function} callbackQuery - A callback query function (optional, defaults to CallbackQuery).
 * @param {function} callbackQueryValidator - A callback query validator function (optional, defaults to CallbackQueryValidator).
 * @returns {string|undefined} The method callback string with color formatting applied to different parts, or undefined if the method callback is not found.
 */
const colorMethodCallback = (
    inputMethod = 'method',
    callback = Callback,
    callbackQuery = CallbackQuery,
    callbackQueryValidator = CallbackQueryValidator
  ) => {
    // Find the method callback using the callback query function and the input method callback name
    const methodCallback = findMethod(`${inputMethod}Callback`, callbackQuery);
  
    // If the method callback is not found, return undefined
    if (!methodCallback) return undefined;
  
    // Replace the input method callback name with color formatting in the method callback string
    let methodCallbackString = methodCallback.replace(`${inputMethod}Callback`, `\x1b[32m${inputMethod}Callback\x1b[0m`);
  
    // Get the index of the input method callback in the method callback string
    const methodCallbackStringIndex = methodCallbackString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
  
    // Extract the portion of the method callback string after the input method callback
    let slice2 = methodCallbackString.slice(methodCallbackStringIndex).slice(1).slice(1).slice(1).slice(1);
  
    // Replace the extracted portion with color formatting in the method callback string
    methodCallbackString = methodCallbackString.replace(slice2, `\x1b[36m${slice2}\x1b[0m`);
  
    return methodCallbackString;
  };
  
/**
 * Applies color formatting to the method validator string based on different parts of the validator.
 *
 * @function colorValidator
 * @param {string} inputMethod - The input method name for which to apply color formatting to the validator.
 * @param {function} callback - The callback function used to find the input method.
 * @param {function} callbackQuery - A callback query function (optional, defaults to CallbackQuery).
 * @param {function} callbackQueryValidator - A callback query validator function (optional, defaults to CallbackQueryValidator).
 * @returns {string|undefined} The method validator string with color formatting applied to different parts, or undefined if the method or validator is not found.
 */
const colorValidator = (
    inputMethod = 'method',
    callback = Callback,
    callbackQuery = CallbackQuery,
    callbackQueryValidator = CallbackQueryValidator
  ) => {
    // Find the method using the callback function and the input method name
    const method = findMethod(inputMethod, callback);
  
    // If the method is not found, return undefined
    if (!method || method == undefined) return;
  
    // Find the validator in the method using the findValidator() function
    const validator = findValidator(method);
  
    // Find the method validator using the callback query validator function and the validator name
    const methodValidator = findMethod(validator, callbackQueryValidator);
  
    // If the method validator is not found, return undefined
    if (!methodValidator) return undefined;
  
    // Replace the validator name with color formatting in the method validator string
    let methodValidatorString = methodValidator.replace(validator, `\x1b[33m${validator}\x1b[0m`);
  
    // Get the index of the validator in the method validator string
    const methodValidatorStringIndex = methodValidatorString.indexOf(validator) + validator.length;
  
    // Extract the portion of the method validator string after the validator
    let sliced = methodValidatorString.slice(methodValidatorStringIndex).slice(1).slice(1).slice(1).slice(1);
  
    // Replace the extracted portion with color formatting in the method validator string
    methodValidatorString = methodValidatorString.replace(sliced, `\x1b[36m${sliced}\x1b[0m`);
  
    return methodValidatorString;
  };
  
/**
 * Exports a function that applies color formatting to different parts of the method, method callback, and method validator strings.
 *
 * @function module.exports
 * @param {string} inputMethod - The input method name for which to apply color formatting.
 * @param {function} callback - The callback function used to find the input method.
 * @param {function} callbackQuery - A callback query function (optional, defaults to CallbackQuery).
 * @param {function} callbackQueryValidator - A callback query validator function (optional, defaults to CallbackQueryValidator).
 * @returns {string|undefined} A formatted string containing the method, method callback, and method validator strings with color formatting, or undefined if the method or method callback is not found.
 */
module.exports = (
    inputMethod = 'method',
    callback = Callback,
    callbackQuery = CallbackQuery,
    callbackQueryValidator = CallbackQueryValidator
  ) => {
    // Get the method string with color formatting using the colorMethod() function
    const methodString = colorMethod(inputMethod, callback);
  
    // Get the method callback string with color formatting using the colorMethodCallback() function
    const methodCallbackString = colorMethodCallback(inputMethod, callback, callbackQuery);
  
    // Get the method validator string with color formatting using the colorValidator() function
    const methodValidatorString = colorValidator(inputMethod, callback, callbackQuery, callbackQueryValidator);
  
    // If the method callback is not found, return undefined
    if (!methodCallbackString || methodCallbackString == undefined) return undefined;
  
    // Concatenate the formatted strings and return the result
    return `
  ${methodString}
  -------------------------------------------------------------
  
  ${methodCallbackString}
  
  ${methodValidatorString}`;
  };
  
// module.exports = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => `
// ${colorMethod(inputMethod, callback)}
// -------------------------------------------------------------

// ${colorMethodCallback (inputMethod, callback, callbackQuery)} 

// ${colorValidator(inputMethod, callback, callbackQuery, callbackQueryValidator)}`
