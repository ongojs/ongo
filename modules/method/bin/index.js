#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc CLI class
 */

const Method = require("../");
const Model = require('../../..')

const { Green, BgBlue, Blue, Cyan, Purple, Red} = require('../../couleurs')();
/**
 * CLI (Command Line Interface) class that extends a base class.
 *
 * @class CLI
 * @extends Base
 * @param {Object[]} arrayOfObjects - An array of objects representing options.
 *                                    Each option object can have key-value pairs.
 * @constructor
 */
class CLI extends require("../../base") {
  /**
   * Creates an instance of the CLI class.
   *
   * @constructor
   * @param {...Object} arrayOfObjects - An array of objects representing options.
   *                                     Each option object can have key-value pairs.
   */
  constructor(...arrayOfObjects) {
    // Call the constructor of the base class with specific options
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    // Loop through the arrayOfObjects and merge the options with the instance's properties
    arrayOfObjects.forEach((option) => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          // Only set the property if it does not exist on the instance
          if (!this[key]) this[key] = option[key];
        });
      }
    });

    // Automatically bind methods to the instance
    this.autobind(CLI);

    // Automatically invoke methods (presumably autoinvoked methods)
    this.autoinvoker(CLI);

    // Uncomment the following line if other classes' methods should be added
    // to this class if those methods do not already exist. The order of arguments matters.
    // this.methodizer(..classList);

    // Set the maximum number of listeners to infinity to avoid listener limit warnings
    this.setMaxListeners(Infinity);
  }



 /**
 * Retrieves the command-line argument at the specified index.
 *
 * @function command
 * @param {number} [index=2] - The index of the command-line argument to retrieve.
 *                            Default value is 2, which corresponds to the third argument
 *                            provided in the command-line (zero-based index).
 * @returns {string} The command-line argument at the specified index.
 */
command(index = 2) {
  /**
   * process.argv is an array containing the command-line arguments.
   * It is a property of the 'process' global object in Node.js.
   * The first two elements of process.argv are:
   *   - process.argv[0]: The path to the Node.js executable
   *   - process.argv[1]: The path to the JavaScript file being executed
   * The actual command-line arguments start from index 2.
   */

  // If the index is not provided or undefined, the default value (2) is used.
  // If the specified index is out of range or non-numeric, it will return undefined.
  return process.argv[index];
}


/**
 * Finds a method in the prototype of a given class and returns its string representation.
 *
 * @function findMethod
 * @param {string} [method='method'] - The name of the method to find in the class prototype.
 *                                    Default value is 'method'.
 * @param {Function} ClassName - The class constructor whose prototype will be searched for the method.
 * @returns {string|undefined} The string representation of the method if found, otherwise returns undefined.
 */
findMethod(method = 'method', ClassName) {
  /**
   * The Reflect object provides methods for interceptable JavaScript operations.
   * Here, we use Reflect.has() to check if the given method exists in the prototype of the ClassName.
   * If the method is present, we use Reflect.get() to access its value (function) from the prototype.
   * Finally, we convert the method to its string representation using the toString() method.
   */

  // Check if the method exists in the prototype of the ClassName.
  if (Reflect.has(ClassName.prototype, method)) {
    // If the method is found, retrieve its value (function) from the prototype.
    const methodValue = Reflect.get(ClassName.prototype, method);

    // Convert the method to its string representation using the toString() method.
    return methodValue.toString();
  }

  // If the method is not found in the prototype, return undefined.
  return undefined;
}

/**
 * Extracts and returns the method body (source code) as a string for the specified method from the given method string.
 *
 * @function colorMethodMethodBodyString
 * @param {string} methodString - The entire source code string containing the method definition.
 * @param {string} inputMethod - The name of the method whose body (source code) needs to be extracted.
 * @returns {string} The method body (source code) as a string for the specified method.
 */
colorMethodMethodBodyString(methodString, inputMethod) {
  /**
   * The function looks for the starting index of the specified inputMethod in the methodString.
   * Then, it extracts the method body (source code) from that index onwards.
   * The function stops extracting the method body once it encounters the fourth dot ('.') character,
   * assuming that the body of the method has ended.
   * It returns the extracted method body (source code) as a string.
   */

  // Find the starting index of the specified inputMethod in the methodString.
  let methodBodyIndex = methodString.indexOf(inputMethod);
  let methodBodyString = '';
  let dotCount = 0;

  // Extract the method body (source code) from the methodBodyIndex onwards.
  for (let i = methodBodyIndex; i < methodString.length; i++) {
    methodBodyString += methodString[i];

    // Count the number of dot ('.') characters encountered to determine the end of the method body.
    if (methodString[i] === '.') {
      dotCount++;
    }

    // Break the loop once the fourth dot is encountered (end of the method body).
    if (dotCount >= 3) {
      break;
    }
  }

  // Return the extracted method body (source code) as a string.
  return methodBodyString;
}

/**
 * Finds and returns an array of comment lines from the given function string.
 *
 * @function findCommentLines
 * @param {string} functionString - The entire function body or source code as a string.
 * @returns {string[]} An array of comment lines found in the functionString.
 */
findCommentLines(functionString) {
  /**
   * The function uses a regular expression to find comment lines in the provided functionString.
   * It matches both single-line (//) and multi-line (/** */ /* comments and returns them as an array.
   * If no comments are found, the function returns an empty array.
   *
   * @example
   * const functionString = `
   *   // This is a single-line comment
   *   function add(a, b) {
   *     /* This is a multi-line
   *     comment. *\/
   *     return a + b;
   *   }
   * `;
   *
   * const comments = findCommentLines(functionString);
   * console.log(comments);
   * // Output: ['// This is a single-line comment', '/* This is a multi-line\n   comment. *\/']
   */

  // Regular expression pattern to match both single-line and multi-line comments.
  const commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;

  // Use the match() method with the commentPattern to find all comments in the functionString.
  // The match() method returns an array of matches, or null if no matches are found.
  return functionString.match(commentPattern) || [];
}

/**
 * Finds and returns the method body string of the specified method in the Model class.
 *
 * @function findInputMethod
 * @param {string} method - The name of the method to find in the Model class.
 * @returns {string|undefined} The method body string of the specified method, or undefined if not found.
 */
findInputMethod(method) {
  /**
   * The function uses the helper function `findMethod` to check if the specified `method`
   * exists in the `Model` class's prototype. If the method is found, its body string is returned.
   * If the method does not exist in the `Model` class, the function returns `undefined`.
   *
   * @param {string} method - The name of the method to find in the Model class.
   * @param {Function} ClassName - The Model class to search for the method.
   * @returns {string|undefined} The method body string of the specified method, or undefined if not found.
   */

  // The function uses the helper function findMethod to search for the method in the Model class.
  // If the method is found, the function returns its body string; otherwise, it returns undefined.
  return this.findMethod(method, Model);
}




// getCommentColoringFunction(method){

//   try {
//     const string = this.findInputMethod(method)
//     const comments = this.findCommentLines(string)
  
//     let functionString = ''
  
//     for(let i = 0; i < comments.length; i++){
//         if(functionString.length == 0){
//             functionString = string.replace(comments[i],Green(comments[i]))
//         }else{
//             functionString = functionString.replace(comments[i],Green(comments[i]))
//         }
//     }
  
//    functionString = functionString.trim().length > 0 ? functionString:  string ;
  
//    const countCode = this.colorMethodMethodBodyString(string, '(')
  
//    const countName = string.split(countCode).filter(el => el.trim().length > 0).join(' ')
  
//    if(countName.split(' ').length  == 2){
//     if(countName.split(' ')[1] && countName.split(' ')[1].trim().length !== 0){
//         functionString = functionString.replace(countName.split(' ')[1], Blue(countName.split(' ')[1]))
//     }
//     if(countName.split(' ')[0] && countName.split(' ')[0].trim().length !== 0){
//         functionString = functionString.replace(countName.split(' ')[0], Purple(countName.split(' ')[0]))
//     }
//    }else{
//     if(countName.split(' ')[0] && countName.split(' ')[0].trim().length !== 0){
//         functionString = functionString.replace(countName.split(' ')[0], Blue(countName.split(' ')[0]))
//     }
//    }
  
  
//     return ` 
//   ===================== model ${Blue(countName.split(' ')[1])} method ===================
  
// ${functionString}
  
//   `
//   }catch (e) {
//     return Red(`method named '${this.command(3)}' does not exist.`)
//   }


// }

/**
 * Retrieves and formats the method body of the specified method, including colored comments and method name.
 *
 * @function getCommentColoringFunction
 * @param {string} method - The name of the method to retrieve and format.
 * @returns {string} A formatted string containing the method body with colored comments and method name.
 */
getCommentColoringFunction(method) {
  try {
    /**
     * The function first attempts to find the method body of the specified `method`
     * using the `findInputMethod` function, which returns the method body string.
     * It then uses the `findCommentLines` function to extract all the comments from the method body.
     */
    const string = this.findInputMethod(method);
    const comments = this.findCommentLines(string);

    let functionString = '';

    // Next, the function iterates over the comments and adds color to each comment.
    for (let i = 0; i < comments.length; i++) {
      if (functionString.length === 0) {
        functionString = string.replace(comments[i], Green(comments[i]));
      } else {
        functionString = functionString.replace(comments[i], Green(comments[i]));
      }
    }

    // After coloring the comments, the function checks if the functionString is empty.
    // If it is, it means there were no comments, and the original string is used.
    functionString = functionString.trim().length > 0 ? functionString : string;

    // The function then proceeds to add color to the method name and any arguments it may have.
    // It uses the `colorMethodMethodBodyString` function to identify the method name.
    const countCode = this.colorMethodMethodBodyString(string, '(');
    const countName = string.split(countCode).filter(el => el.trim().length > 0).join(' ');

    // Depending on the number of parts in the countName (split by spaces), the function adds color
    // to the method name and any arguments.
    if (countName.split(' ').length == 2) {
      if (countName.split(' ')[1] && countName.split(' ')[1].trim().length !== 0) {
        functionString = functionString.replace(countName.split(' ')[1], Blue(countName.split(' ')[1]));
      }
      if (countName.split(' ')[0] && countName.split(' ')[0].trim().length !== 0) {
        functionString = functionString.replace(countName.split(' ')[0], Purple(countName.split(' ')[0]));
      }
    } else {
      if (countName.split(' ')[0] && countName.split(' ')[0].trim().length !== 0) {
        functionString = functionString.replace(countName.split(' ')[0], Blue(countName.split(' ')[0]));
      }
    }

    /**
     * Finally, the function returns a formatted string containing the method body
     * with colored comments and the method name.
     */
    return `
  ===================== model ${Blue(countName.split(' ')[1])} method ===================
  
${functionString}
  
  `;
  } catch (e) {
    /**
     * If there is an error, meaning the method does not exist, the function returns
     * a red-colored error message indicating that the method named '${this.command(3)}' does not exist.
     */
    return Red(`method named '${this.command(3)}' does not exist.`);
  }
}

/**
 * Lists all the methods of a given class, optionally displaying method bodies with colored comments.
 *
 * @function methodList
 * @param {Function} className - The class whose methods will be listed.
 * @param {boolean} [string=false] - Whether to display method bodies with colored comments. Default is false.
 */
methodList(className, string = false) {
  /**
   * The function iterates over all the properties (methods) of the `className.prototype`.
   * For each property, it checks if it exists and is a function (method).
   */
  for (let method of Object.getOwnPropertyNames(className.prototype)) {
    if (className.prototype[method]) {
      if (typeof className.prototype[method] === "function") {
        /**
         * If `string` parameter is true, it means the method bodies with colored comments
         * need to be displayed. In that case, it calls the `getCommentColoringFunction` function
         * to retrieve and format the method body of each method with colored comments and displays it.
         * Otherwise, it simply displays the method name.
         */
        if (string) {
          console.log(this.getCommentColoringFunction(method));
        } else {
          console.log(className.prototype[method]);
        }
      }
    }
  }
}



/**
 * Executes a default action based on the provided command line arguments.
 * If no command is provided, it calls the `method()` function of the `Method` class with a default command.
 * If a command is provided, it checks if it starts with '--name='. If so, it further examines the subsequent arguments to determine the action to perform.
 * If the command follows the format '--name=<method_name>', it checks the next argument to determine the action.
 * If the next argument is '--info' or '-i', it calls the `info()` or `i()` function of the `Method` class with the specified method name.
 * If the next argument is neither '--info' nor '-i', it prints 'invalid option!'.
 * If the command does not follow the format '--name=<method_name>', it prints 'invalid command'.
 * If no valid command is provided, it prints 'invalid command'.
 * The `Method` class and its functions are used to handle method-related operations.
 *
 * @function default
 */
default() {
  // Check if a command is provided in the 2nd argument of the command line
  if (!this.command(2)) {
    // If no command is provided, call the `method()` function of the `Method` class with a default command
    return new Method({ command: this.command(2) }).method();
  } else {
    // If a command is provided, check if it starts with '--name='
    if (this.command(2).startsWith('--name=')) {
      // Split the command to extract the method name
      const methodName = this.command(2).split('=')[1];
      // Check the next argument to determine the action
      if (this.command(3) === '--info') {
        // If the next argument is '--info', call the `info()` function of the `Method` class with the specified method name
        return new Method({ command: methodName }).info(this.command(3));
      } else if (this.command(3) === '-i') {
        // If the next argument is '-i', call the `i()` function of the `Method` class with the specified method name
        return new Method({ command: methodName }).i(this.command(3));
      } else {
        // If the next argument is neither '--info' nor '-i', print 'invalid option!'
        return console.log('invalid option!');
      }
    } else {
      // If the command does not follow the format '--name=<method_name>', print 'invalid command'
      return console.log('invalid command');
    }
  }
}

/**
 * Executes different actions based on the provided command line arguments.
 * If the 3rd argument of the command line exists, it further examines the 4th argument to determine the action to perform.
 * If the 4th argument is '-i', it calls the `i()` function of the `Method` class with the 3rd argument as the method name to display usage information for that method.
 * If the 4th argument is '--info', it calls the `info()` function of the `Method` class with the 3rd argument as the method name to display detailed information about that method.
 * If the 4th argument is neither '-i' nor '--info', it prints 'is not a valid option'.
 * If the 3rd argument does not exist, it checks the 2nd argument to determine the action.
 * If the 2nd argument exists, it calls the `n()` function of the `Method` class with the 2nd argument as the method name to display basic method usage information.
 * If the 2nd argument does not exist, it calls the `n()` function of the `Method` class with a default method name to display basic method usage information.
 * The `Method` class and its functions are used to handle method-related operations.
 *
 * @function n
 */
n() {
  // Check if the 3rd argument exists in the command line
  if (this.command(3)) {
    // If the 4th argument exists, examine it to determine the action
    if (this.command(4)) {
      switch (this.command(4)) {
        case "-i":
          // If the 4th argument is '-i', call the `i()` function of the `Method` class with the 3rd argument as the method name to display usage information
          new Method({ command: this.command(3) }).i(this.command(4));
          break;
        case "--info":
          // If the 4th argument is '--info', call the `info()` function of the `Method` class with the 3rd argument as the method name to display detailed information
          new Method({ command: this.command(3) }).info(this.command(4));
          break;
        default:
          // If the 4th argument is neither '-i' nor '--info', print 'is not a valid option'
          console.log(this.command(4), "is not a valid option");
          break;
      }
    } else {
      // If the 4th argument does not exist, call the `n()` function of the `Method` class with the 3rd argument as the method name to display basic method usage information
      new Method({ command: this.command(2) }).n(this.command(4));
    }
  } else {
    // If the 3rd argument does not exist, check the 2nd argument to determine the action
    if (this.command(2)) {
      // If the 2nd argument exists, call the `n()` function of the `Method` class with the 2nd argument as the method name to display basic method usage information
      new Method({ command: this.command(2) }).n();
    } else {
      // If the 2nd argument does not exist, call the `n()` function of the `Method` class with a default method name to display basic method usage information
      new Method({ command: this.command(2) }).n();
    }
  }
}

/**
 * Executes different actions based on the provided command line arguments.
 * If the 3rd argument of the command line exists, it further examines the 4th argument to determine the action to perform.
 * If the 4th argument is '-i', it calls the `i()` function of the `Method` class with the 3rd argument as the method name to display usage information for that method.
 * If the 4th argument is '--info', it calls the `info()` function of the `Method` class with the 3rd argument as the method name to display detailed information about that method.
 * If the 4th argument is neither '-i' nor '--info', it prints 'is not a valid option'.
 * If the 3rd argument does not exist, it checks the 2nd argument to determine the action.
 * If the 2nd argument exists, it calls the `n()` function of the `Method` class with the 2nd argument as the method name to display basic method usage information.
 * If the 2nd argument does not exist, it calls the `n()` function of the `Method` class with a default method name to display basic method usage information.
 * The `Method` class and its functions are used to handle method-related operations.
 *
 * @function name
 */
name() {
  // Check if the 3rd argument exists in the command line
  if (this.command(3)) {
    // If the 4th argument exists, examine it to determine the action
    if (this.command(4)) {
      switch (this.command(4)) {
        case "-i":
          // If the 4th argument is '-i', call the `i()` function of the `Method` class with the 3rd argument as the method name to display usage information
          new Method({ command: this.command(3) }).i(this.command(4));
          break;
        case "--info":
          // If the 4th argument is '--info', call the `info()` function of the `Method` class with the 3rd argument as the method name to display detailed information
          new Method({ command: this.command(3) }).info(this.command(4));
          break;
        default:
          // If the 4th argument is neither '-i' nor '--info', print 'is not a valid option'
          console.log(this.command(4), "is not a valid option");
          break;
      }
    } else {
      // If the 4th argument does not exist, call the `n()` function of the `Method` class with the 3rd argument as the method name to display basic method usage information
      new Method({ command: this.command(2) }).n(this.command(4));
    }
  } else {
    // If the 3rd argument does not exist, check the 2nd argument to determine the action
    if (this.command(2)) {
      // If the 2nd argument exists, call the `n()` function of the `Method` class with the 2nd argument as the method name to display basic method usage information
      new Method({ command: this.command(2) }).n();
    } else {
      // If the 2nd argument does not exist, call the `n()` function of the `Method` class with a default method name to display basic method usage information
      new Method({ command: this.command(2) }).n();
    }
  }
}

/**
 * Executes different commands based on the second argument of the command line.
 * The function acts as a command dispatcher and performs specific actions depending on the provided command.
 * It switches between different cases to handle different commands.
 *
 * @function commands
 */
commands() {
  // Switch between different cases based on the second argument of the command line
  switch (this.command(2)) {
    case "--list":
      // If the second argument is '--list', call the `list()` function of the `Method` class to list available methods
      new Method({ command: this.command(2) }).list();
      break;
    case "man":
      // If the second argument is 'man', print 'make man page'
      console.log("make man page");
      break;
    case "-n":
      // If the second argument is '-n', call the `getCommentColoringFunction()` function with the third argument as the method name to print colored method information
      console.log(this.getCommentColoringFunction(this.command(3)));
      break;
    case "--name":
      // If the second argument is '--name', call the `getCommentColoringFunction()` function with the third argument as the method name to print colored method information
      console.log(this.getCommentColoringFunction(this.command(3)));
      break;
    case "help":
      // If the second argument is 'help', print 'help man page'
      console.log("help man page");
      break;
    default:
      // If the second argument does not match any of the cases above, call the `default()` function to perform the default action
      this.default();
      break;
  }
}


/**
 * Initializes the application by calling the `commands()` function.
 * This function serves as the entry point for the application, where the command line arguments are processed and appropriate actions are executed accordingly.
 *
 * @function init
 */
init() {
  // Call the `commands()` function to process command line arguments and execute appropriate actions
  this.commands();
}

/**
 * Returns an array of strings representing the names of functions that should be automatically invoked during the instantiation of the class.
 * The returned functions are executed without any explicit call from the outside, ensuring that certain operations are automatically performed upon class instantiation.
 *
 * @function autoinvoked
 * @returns {string[]} An array of strings representing the names of functions to be auto-invoked.
 */
autoinvoked() {
  // Return an array of strings representing the names of functions to be automatically invoked during class instantiation
  return ["init"];
}

}

module.exports = new CLI();
