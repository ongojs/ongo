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


"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Man
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Man class
 */

const { createReadStream, createWriteStream, promises } = require("fs");

class Man extends require("../base") {
    constructor(options = {}) {
        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        Object.keys(options).forEach((key) => {
            this[key] = options[key];
        });

        // auto bind methods
        this.autobind(Man);
        // auto invoke methods
        this.autoinvoker(Man);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
    }


    /**
     * Create a directory at the specified absolute path with the given directory name.
     * If the directory already exists, it will not throw an error.
     * @param {string} absolutePath - The absolute path to the parent directory where the new directory will be created.
     * @param {string} directory - The name of the new directory to be created.
     * @returns {Promise<void>} - A Promise that resolves when the directory is successfully created.
     */
    async makeDirectory(absolutePath = '../app', directory = 'models') {
        try {
            // Join the provided absolute path and directory name to create the full path of the new directory.
            const projectFolder = join(process.cwd(), absolutePath, directory);

            // Create the directory at the specified path, and set the recursive option to true to create parent directories if needed.
            await mkdir(projectFolder, { recursive: true });

            // Log a success message after creating the directory.
            console.log(`Directory '${directory}' created at: ${projectFolder}`);

            // Return a Promise that resolves after the directory is successfully created.
            return Promise.resolve();
        } catch (error) {
            // If there is an error while creating the directory, log the error and reject the Promise with the error.
            console.error('Error creating directory:', error);
            return Promise.reject(error);
        }
    }



  /**
   * A text aligner function that formats and prints key-value pairs or single values with customizable options.
   *
   * @param {...Object|string} args - The key-value pairs or single values to be formatted and printed.
   * @param {Object} [options] - Customizable options for text alignment and formatting.
   * @param {number} [options.pad=75] - The padding size for aligning the values. (Default: 75)
   * @param {number} [options.position=process.stdout.columns] - The position where the text alignment should happen. (Default: process.stdout.columns)
   * @param {boolean} [options.hline=false] - If true, a horizontal line will be used as a separator for each key-value pair. (Default: false)
   * @param {string} [options.keyColor="36"] - The color code for the key (property) part of the output using ANSI escape sequences. (Default: "36" which represents cyan color)
   * @param {string} [options.valueColor="33"] - The color code for the value part of the output using ANSI escape sequences. (Default: "33" which represents yellow color)
   * @returns {void} This function does not return anything, but prints the formatted output to the console.
   */

  textAligner(...args) {
    let options = {
      pad: 75,
      position: process.stdout.columns,
      hline: false,
      keyColor: "36",
      valueColor: "33",
    };
    if (args.length > 1) {
      if (typeof args[0] === "object") {
        for (let prop in args[0]) {
          if (options.hasOwnProperty(prop)) {
            options[prop] = args[0][prop];
          }
        }
      }
    }

    let i = args.length > 1 ? 1 : 0;

    for (; i < args.length; i++) {
      if (typeof args[i] === "object") {
        for (let prop in args[i]) {
          let key = `\x1b[${options.keyColor}m${prop}\x1b[0m`;
          let value = `\x1b[${options.valueColor}m${args[i][prop]}\x1b[0m`;
          let padding = options.pad - key.length;

          for (let i = 0; i < padding; i++) {
            key += " ";
          }
          key += value;
          options.hline === true
            ? hline(1, options.position, key)
            : console.log(key);
        }
      } else {
        let key = `\x1b[36mKey\x1b[0m`;
        let value = `\x1b[33m${args[i]}\x1b[0m`;
        let padding = options.pad - key.length;

        for (let i = 0; i < padding; i++) {
          key += " ";
        }
        key += value;
        options.hline === true
          ? hline(1, options.position, key)
          : console.log(key);
      }
    }
  };

//   exampleMethod(){}


    /**
     * Prints a vertical space by printing empty lines based on the specified number of lines.
     * 
     * @param {number} NumberOfLines - The number of empty lines to be printed. (Default: 1)
     * @returns {void} This function does not return anything, but prints empty lines to create vertical space in the console.
     */

    verticalSpace(NumberOfLines) {
        // Check if NumberOfLines is a positive number, otherwise default to 1
        NumberOfLines =
            typeof NumberOfLines === "number" && NumberOfLines > 0
                ? NumberOfLines
                : 1;

        // Print empty lines based on the specified number of lines
        for (let i = 0; i < NumberOfLines; i++) {
            console.log("");
        }
    }


    // horizontal line across the screen
    /**
     * Prints a horizontal line in the console with a width equal to the width of the terminal window.
     *
     * @returns {void} This function does not return anything, but prints a horizontal line of '-' characters in the console.
     */

    horizontalLine() {
        // Get the width of the terminal window
        const width = process.stdout.columns;

        // Initialize an empty string to store the horizontal line
        let line = "";

        // Create the horizontal line by appending '-' characters to the line string
        for (let i = 0; i < width; i++) {
            line += "-";
        }

        // Print the horizontal line in the console
        console.log(line);
    }


    // create centered text on the screen
    /**
     * Prints a string centered in the console with respect to the terminal window width.
     *
     * @param {string} str - The string to be centered in the console.
     * @returns {void} This function does not return anything, but prints the centered string in the console.
     */

    centered(str) {
        // Check if 'str' is a non-empty string after trimming, otherwise set it to an empty string
        str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";

        // Get the width of the terminal window
        const width = process.stdout.columns;

        // Calculate the left padding to center the string
        const leftPadding = Math.floor((width - str.length) / 2);

        // Initialize an empty string to store the centered line
        let line = "";

        // Add left padding spaces before the string to center it
        for (let i = 0; i < leftPadding; i++) {
            line += " ";
        }

        // Append the centered string to the line
        line += str;

        // Print the centered line in the console
        console.log(line);
    }


    // padding (str){
    //     str = typeof (str) === 'string' && str.trim().length > 0 ? str.trim() : ''
    //     const width = process.stdout.columns
    //     // calculate left padding
    //     const leftPadding = Math.floor((width - str.length) / 2)
    //     // put in left padding space before the string
    //     let line = ''
    //     for (let i = 0; i < leftPadding; i++) {
    //         line += ' '
    //     }
    //     line += str
    //     console.log(line)
    // }

    /**
     * Prints a string with left padding in the console to create a description-like format.
     *
     * @param {string} str - The string to be formatted as a description.
     * @returns {void} This function does not return anything, but prints the formatted string in the console.
     */

    description(str) {
        // Check if 'str' is a non-empty string after trimming, otherwise set it to an empty string
        str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";

        // Get the width of the terminal window
        const width = process.stdout.columns;

        // Calculate the left padding required to create a description-like format
        const leftPadding = Math.floor((width - str.length) / 4);

        // Initialize an empty string to store the description line
        let line = "";

        // Add left padding spaces before the string to create the description format
        for (let i = 0; i < leftPadding; i++) {
            line += " ";
        }

        // Append the formatted string to the line
        line += str;

        // Print the description line in the console
        console.log(line);
    }


    /**
     * Prints a string with left padding in the console to create a manual-like format.
     *
     * @param {string} str - The string to be formatted as a manual entry.
     * @returns {void} This function does not return anything, but prints the formatted string in the console.
     */

    manual(str) {
        // Check if 'str' is a non-empty string after trimming, otherwise set it to an empty string
        str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";

        // Get the width of the terminal window
        const width = process.stdout.columns;

        // Calculate the left padding required to create a manual-like format
        const leftPadding = Math.floor((width - str.length) / 4);

        // Initialize an empty string to store the manual entry
        let line = "";

        // Add left padding spaces before the string to create the manual format
        for (let i = 0; i < leftPadding; i++) {
            line += " ";
        }

        // Append the formatted string to the line
        line += str;

        // Print the manual entry in the console
        console.log(line);
    }



    /**
     * Converts the given arguments into an array of objects with 'object' and 'options' properties.
     *
     * @param {...*} args - The arguments to be converted into an array of objects.
     * @returns {Array} An array of objects, each containing 'object' and 'options' properties.
     */
    objectToDisplay(...args) {
        // Initialize an empty 'option' object with 'object' and 'options' properties
        let option = {
            object: {},
            options: {},
        };

        // Check if no arguments are provided, and return the 'option' object
        if (args.length === 0) {
            return option;
        }

        // Process each argument and convert them into objects with 'object' and 'options' properties
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "object") {
                // If the argument is an object, check and set 'object' and 'options' properties accordingly
                if (!args[i].hasOwnProperty("object") && !args[i].hasOwnProperty("options")) {
                    option.object = args[i];
                    args[i] = option;
                }
                if (args[i].hasOwnProperty("object") && !args[i].hasOwnProperty("options")) {
                    option.object = args[i]["object"];
                    args[i] = option;
                }
                if (!args[i].hasOwnProperty("object") && args[i].hasOwnProperty("options")) {
                    option.options = args[i]["options"];
                    args[i] = option;
                }
            } else if (typeof args[i] !== "object") {
                // If the argument is not an object, create an object with 'key' property and set 'object' accordingly
                if (!args[i].hasOwnProperty("object") && args[i].hasOwnProperty("options")) {
                    option.object = {
                        key: args[i],
                    };
                    args[i] = option;
                } else {
                    option.object = {
                        key: args[i],
                    };
                    args[i] = option;
                }
            }
        }

        // Return the array of objects with 'object' and 'options' properties
        return args;
    }




    /**
     * Displays objects or values with custom options using `util.inspect` from the Node.js `util` module.
     *
     * @param {...*} args - The arguments to be displayed with custom options using `util.inspect`.
     * @returns {void} This function does not return anything, but prints the formatted output in the console.
     */

    displayer(...args) {
        // Define default options for `util.inspect`
        let option = {
            showHidden: true,
            depth: 10,
            colors: true,
            showProxy: true,
            maxArrayLength: 100,
            compact: true,
            sorted: true,
        };

        // Create an object 'dargs' with 'object' and 'options' properties, used for default arguments
        let dargs = {
            object: {
                data: "no data",
            },
            options: option,
        };

        // Check if no arguments are provided, and display 'dargs.object' with 'dargs.options'
        if (args.length === 0) {
            console.log(util.inspect(dargs.object, dargs.options));
            return;
        }

        // Process each argument and display them with custom options using `util.inspect`
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "object") {
                // If the argument is an object and has both 'object' and 'options' properties
                if (args[i].hasOwnProperty("object") && args[i].hasOwnProperty("options")) {
                    // Check if the 'options' property is not an empty object
                    if (JSON.stringify(args[i]["options"]) !== "{}") {
                        // Merge the properties of 'args[i]["options"]' into 'option'
                        for (let prop in args[i]["options"]) {
                            if (option.hasOwnProperty(prop)) {
                                option[prop] = args[i]["options"][prop];
                            }
                        }
                    }
                    // Display 'args[i]["object"]' with the updated 'option'
                    console.log(util.inspect(args[i]["object"], option));
                }
                // If the argument is an object and has 'object' property but no 'options' property
                else if (args[i].hasOwnProperty("object") && !args[i].hasOwnProperty("options")) {
                    // Display 'args[i]["object"]' with the default 'option'
                    console.log(util.inspect(args[i]["object"], option));
                }
                // If the argument is an object but does not have 'object' property
                else if (!args[i].hasOwnProperty("object")) {
                    // Display 'dargs.object' with 'dargs.options'
                    console.log(util.inspect(dargs.object, dargs.options));
                }
            }
            // If the argument is not an object, display it as is
            else {
                console.log(args[i], "here");
            }
        }
    }

    /**
     * Displays an object with custom options using the `displayer` and `objectToDisplay` methods.
     *
     * @param {Object} object - The object to be displayed with custom options.
     * @returns {void} This function does not return anything, but prints the formatted output in the console.
     */
    display(object) {
        // Convert the object to an array of objects with 'object' and 'options' properties
        const objectArray = this.objectToDisplay(object);

        // Display each object in the array using the 'displayer' method with custom options
        this.displayer(...objectArray);
    }



    /**
     * Displays a string with left padding, color, and the number of repetitions based on the provided options.
     *
     * @param {...*} args - The arguments to customize the padding and appearance of the string.
     * @returns {void} This function does not return anything, but prints the formatted output in the console.
     */
    padding(...args) {
        // Default options for padding
        let options = {
            string: "-",
            number: process.stdout.columns,
            color: 37,
        };

        // If no arguments are provided, display the string with default options
        if (args.length === 0) {
            // Calculate left padding
            let padding = Math.floor(
                (process.stdout.columns - options.string.length) / options.number
            );

            // Create the line with left padding and colored string
            let line = "";
            for (let i = 0; i < padding; i++) {
                line += " ";
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`;

            // Print the line to the console
            console.log(line);
            return;
        }

        // Process each argument and apply custom options for padding and color
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "object") {
                // If the argument is an object, apply custom options for padding and color
                for (let prop in args[i]) {
                    let checkProp = prop === "number" && args[i][prop] <= 0 ? 1 : prop;
                    if (options.hasOwnProperty(checkProp)) {
                        options[checkProp] = args[i][checkProp];
                    }
                }
            } else {
                // Calculate left padding
                let padding = Math.floor(
                    (process.stdout.columns - options.string.length) / options.number
                );

                // Create the line with left padding and colored string
                let line = "";
                for (let i = 0; i < padding; i++) {
                    line += " ";
                }
                line += `\x1b[${options.color}m${options.string}\x1b[0m`;

                // Print the line to the console
                console.log(line);
            }

            // Calculate left padding
            let padding = Math.floor(
                (process.stdout.columns - options.string.length) / options.number
            );

            // Create the line with left padding and colored string
            let line = "";
            for (let i = 0; i < padding; i++) {
                line += " ";
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`;

            // Print the line to the console
            console.log(line);
        }
    }


    /**
     * Calculates the elapsed time between two date objects in years, months, days, hours, minutes, and seconds.
     *
     * @param {Date} start - The starting date object. If not provided or not a valid Date, the current date and time will be used.
     * @param {Date} end - The ending date object. If not provided or not a valid Date, the current date and time will be used.
     * @returns {Object} An object containing the elapsed time in years, months, days, hours, minutes, and seconds.
     */
    elapsed(start = new Date(), end = new Date()) {
        // Check if 'start' is a valid Date, and use the current date and time if it's not
        if (!util.types.isDate(start)) {
            start = new Date();
        }

        // Check if 'end' is a valid Date, and use the current date and time if it's not
        if (!util.types.isDate(end)) {
            end = new Date();
        }

        // Initialize the result object to store the calculated time components
        let result = {};

        // Get the time difference in seconds
        let delatt = (end - start) / 1000;

        // Calculate the elapsed time in years, months, days, hours, minutes, and seconds
        let ymod = delatt / (60 * 60 * 24 * 365);
        let years = Math.trunc(delatt / (60 * 60 * 24 * 365));

        let mmod = 12 * (ymod - years);
        let months = Math.trunc(mmod);

        let dmod = (365 * (mmod - months)) / 12;
        let days = Math.trunc(dmod);

        let hmod = 24 * (dmod - days);
        let hours = Math.trunc(hmod);

        let minmod = 60 * (hmod - hours);
        let minutes = Math.trunc(minmod);

        let smod = 60 * (minmod - minutes);
        let seconds = Math.trunc(smod);

        // Store the calculated time components in the result object
        result.years = years;
        result.months = months;
        result.days = days;
        result.hours = hours;
        result.minutes = minutes;
        result.seconds = seconds;

        return result;
    }



    /**
    * Pluralizes a noun based on the given quantity.
    *
    * @param {string} item - The noun to be pluralized.
    * @param {number} quantity - The quantity to determine if the noun should be pluralized.
    * @returns {string} The pluralized noun if the quantity is greater than 1, otherwise the original noun.
    */
    pluralize(item, quantity) {
        /**
         * Pluralizes a noun based on the given quantity.
         *
         * @param {string} item - The noun to be pluralized.
         * @param {number} quantity - The quantity to determine if the noun should be pluralized.
         * @returns {string} The pluralized noun if the quantity is greater than 1, otherwise the original noun.
         */
        return quantity > 1 ? `${item}s` : `${item}`;
    }

    /**
     * Splits a string into an array using a specified delimiter and removes empty strings. Trims leading and trailing spaces from each element in the resulting array.
     *
     * @param {string} str - The input string to be split.
     * @param {string} spl - The delimiter to use for splitting the string.
     * @returns {string[]} An array of non-empty strings resulting from splitting the input string using the specified delimiter and trimming each element.
     */
    spliter(str, spl) {
        /**
         * Splits a string into an array using a specified delimiter and removes empty strings. Trims leading and trailing spaces from each element in the resulting array.
         *
         * @param {string} str - The input string to be split.
         * @param {string} spl - The delimiter to use for splitting the string.
         * @returns {string[]} An array of non-empty strings resulting from splitting the input string using the specified delimiter and trimming each element.
         */
        if (str === undefined || spl === undefined) return [];

        // Split the string using the specified delimiter and remove empty strings
        return str
            .split(spl)
            .filter((string) => string != "")
            .map((st) => st.trim());
    }

    /**
     * Cleans a string by removing leading and trailing spaces from each word and collapsing multiple spaces into single spaces.
     *
     * @param {string} string - The input string to be cleaned.
     * @returns {string} The cleaned string with leading and trailing spaces removed from each word and multiple spaces collapsed into single spaces.
     */
    clean(string) {
        /**
         * Cleans a string by removing leading and trailing spaces from each word and collapsing multiple spaces into single spaces.
         *
         * @param {string} string - The input string to be cleaned.
         * @returns {string} The cleaned string with leading and trailing spaces removed from each word and multiple spaces collapsed into single spaces.
         */
        return string
            .split(" ")               // Split the string into an array of words using space as the delimiter
            .filter((str) => str != "")   // Filter the array to remove any empty words (spaces between consecutive spaces)
            .map((str) => str.trim())     // Trim leading and trailing spaces from each word in the array
            .join(" ");              // Join the cleaned words back into a single string using space as the separator
    }

    /**
     * Calculates the elapsed time from a given date until the current date and time.
     *
     * @param {string|Date} date - The date from which to calculate the elapsed time. It can be a Date object or a string representation of a date that can be parsed by the Date constructor.
     * @returns {Object} An object containing the elapsed time in years, months, days, hours, minutes, and seconds.
     */
    onfromthelasttime(date) {
        /**
         * Calculates the elapsed time from a given date until the current date and time.
         *
         * @param {string|Date} date - The date from which to calculate the elapsed time. It can be a Date object or a string representation of a date that can be parsed by the Date constructor.
         * @returns {Object} An object containing the elapsed time in years, months, days, hours, minutes, and seconds.
         */
        return this.elapsed(new Date(date), new Date());
    }

    /**
     * Completes a command-line input based on a list of predefined completions.
     *
     * @param {string} line - The input line to be completed.
     * @returns {Array} An array containing completions matching the input line and the original input line.
     */
    completer(line) {
        /**
         * Completes a command-line input based on a list of predefined completions.
         *
         * @param {string} line - The input line to be completed.
         * @returns {Array} An array containing completions matching the input line and the original input line.
         */
        const completions = ".help .error .exit .quit .q".split(" ");

        // Filter completions to find matches starting with the input line
        const hits = completions.filter((c) => c.startsWith(line));

        // If there are matches, return the matching completions; otherwise, return all completions
        return [hits.length ? hits : completions, line];
    }
    /**
     * Sets up common event listeners for a custom command-line interface (CLI) object.
     * Adds event listeners for "clear", "exit", "leave", and "quit" commands.
     */
    common() {
        /**
         * Sets up common event listeners for a custom command-line interface (CLI) object.
         * Adds event listeners for "clear", "exit", "leave", and "quit" commands.
         */
        this.on("clear", () => {
            // Event listener for "clear" command - clears the console
            console.clear();
        });

        this.on("exit", () => {
            // Event listener for "exit" command - closes the custom CLI
            this.close();
        });

        this.on("leave", () => {
            // Event listener for "leave" command - closes the custom CLI
            this.close();
        });

        this.on("quit", () => {
            // Event listener for "quit" command - closes the custom CLI
            this.close();
        });
    }

    /**
     * Sets up event listeners for handling invalid commands and errors in a custom command-line interface (CLI) object.
     * Adds event listeners for "command-not-found", "error", and "success" events.
     */
    invalidCommand() {
        /**
         * Sets up event listeners for handling invalid commands and errors in a custom command-line interface (CLI) object.
         * Adds event listeners for "command-not-found", "error", and "success" events.
         */

        this.on("command-not-found", (data) => {
            // Event listener for "command-not-found" event - handles invalid commands
            console.log();
            console.log(`\x1b[31m${data.error}\x1b[0m`); // Prints the error message in red color
            console.log();
            // this.prompt(); // Optionally, prompts the user for the next command
            // process.exit(0); // Optionally, exits the CLI process
        });

        this.on("error", (data) => {
            // Event listener for "error" event - handles general errors
            console.log();
            console.log(`\x1b[31m${data.error}\x1b[0m`); // Prints the error message in red color
            console.log();
            // this.prompt(); // Optionally, prompts the user for the next command
            // process.exit(0); // Optionally, exits the CLI process
        });

        this.on("success", (data) => {
            // Event listener for "success" event - handles successful commands
            console.log(`\x1b[36m${data.message}\x1b[0m`); // Prints the success message in cyan color
        });
    }


    /**
     * Displays information about an object using the Node.js 'util.inspect' function.
     *
     * @param {any} object - The object to be inspected and displayed.
     * @param {number} [depth=1] - The depth to which the object should be inspected. Defaults to 1.
     */
    infos(object, depth = 1) {
        /**
         * Displays information about an object using the Node.js 'util.inspect' function.
         *
         * @param {any} object - The object to be inspected and displayed.
         * @param {number} [depth=1] - The depth to which the object should be inspected. Defaults to 1.
         */
        console.log(
            util.inspect(object, {
                showHidden: true,
                colors: true,
                depth: depth,
            })
        );
    }

    /**
     * Generates a usage message for a command.
     *
     * @param {string} command - The command for which the usage message is generated.
     * @returns {string} A formatted usage message for the given command.
     */
    usage(command) {
        /**
         * Generates a usage message for a command.
         *
         * @param {string} command - The command for which the usage message is generated.
         * @returns {string} A formatted usage message for the given command.
         */
        return `
----------------------------------------------------
| ${command} ----------------------------------------------------
`;
    }


    man(string) {

        const commands = {
            '\x1b[36mman\x1b[0m': '                  model man page: [\x1b[36mman\x1b[0m] ',
            '\x1b[36m--help\x1b[0m or \x1b[36m-h\x1b[0m': '         Help: [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m\x1b[0m\x1b[0m]',
            '\x1b[36mmake:model\x1b[0m': '           Make model: [\x1b[36mmake:model\x1b[0m\x1b[0m\x1b[0m] model_name',
            '\x1b[36mmake:migration\x1b[0m': '       Make migration: [\x1b[36mmake:migration\x1b[0m\x1b[0m] migration_name',
            '\x1b[36mmake:schema\x1b[0m': '          Make schema: [\x1b[36mmake:schema\x1b[0m\x1b[0m\x1b[0m] schema_name',
            '\x1b[36mmigrate\x1b[0m ': '             Migrate: [\x1b[36m--schema=\x1b[0m|\x1b[36m-s\x1b[0m]schema_name'

        }

        // let clean = string.split(' ').filter(str => str !== '').join(' ')


        if (string === 'man' || string === ' -h' || string === '--help' || string === 'help') {
            console.clear()
            const centered = `\x1b[36mNAME\x1b[0m
\x1b[36mmodel\x1b[0m - Model and an model's methods details 

\x1b[36mSYPNOSIS\x1b[0m
\x1b[36mmodel\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36mhelp\x1b[0m]
\x1b[36mmodel\x1b[0m [\x1b[36mmake:model\x1b[0m\x1b[0m\x1b[0m\x1b[0m\x1b[0m] model_name
\x1b[36mmodel\x1b[0m [\x1b[36mmake:schema\x1b[0m\x1b[0m] schema_name
\x1b[36mmodel\x1b[0m [\x1b[36mmake:migration\x1b[0m|\x1b[36m--migration=\x1b[0m\x1b[0m\x1b[0m\x1b[0m] migration_name \x1b[0m
\x1b[36mmodel\x1b[0m [\x1b[36mmigrate\x1b[0m|\x1b[36m--schema=\x1b[0m\x1b[0m] schema_name


\x1b[36mDESCRIPTION\x1b[0m
Model (short for MongoDB Model) is a versatile and efficient tool for interacting with a 
MongoDB database and facilitating internal or external API calls. It is important to note
that Model is not an ORM (Object-Relational Mapping) but rather a wrapper for the native 
MongoDB Node.js driver. By doing so, it simplifies the usage of the MongoDB native Node.js 
driver and alleviates common complexities associated with it, as well as with Mongoose.js.

Model operates as a duplex stream, specifically utilizing the Node.js native transform stream.
This allows it to harness the full power of the MongoDB native Node.js driver and the native
Node.js transform stream API. Put simply, any operation achievable with the native MongoDB 
Node.js driver and the native Node.js transform API can also be accomplished using Model.

An inherent strength of Model lies in its highly event-driven nature. It seamlessly integrates
with Mongoose.js, ensuring compatibility and enhancing its capabilities.

In summary, Model provides a straightforward yet powerful means of interacting with MongoDB databases,
making API calls, and working with data streams. It simplifies the usage of the native MongoDB Node.js
driver and the Node.js transform stream API, while being fully compatible with Mongoose.js.
`
            //this.horizontalLine()
            this.centered(`\x1b[32mMODEL COMMANDS AND USAGE MANUAL\x1b[0m`)
            //this.horizontalLine()
            this.description(centered)
            //this.horizontalLine()
            this.verticalSpace(2)

            const options = { pad: 13, position: process.stdout.columns, hline: false, keyColor: '36', valueColor: '37' }
            this.textAligner(options, commands)
            console.log()
        }
    }

    /**
     * Adds default functions to the object if they are not already defined.
     * - If `createWriteStream` is not defined on the object, it will be set to the Node.js `fs.createWriteStream` function.
     * - If `createReadStream` is not defined on the object, it will be set to the Node.js `fs.createReadStream` function.
     * - If `promises` is not defined on the object, it will be set to the Node.js `fs.promises` module for Promise-based file system operations.
     */
    addDefault() {
        // Check if the object already has a `createWriteStream` property. If not, set it to `fs.createWriteStream`.
        if (!this.createWriteStream) this.createWriteStream = createWriteStream;

        // Check if the object already has a `createReadStream` property. If not, set it to `fs.createReadStream`.
        if (!this.createReadStream) this.createReadStream = createReadStream;

        // Check if the object already has a `promises` property. If not, set it to `fs.promises`.
        if (!promises) this.promises = promises;
    }

    /**
     * Returns an array containing the name of the function "addDefault".
     * This function is automatically invoked when the containing module is imported or loaded.
     * The purpose is to indicate that the "addDefault" function should be executed upon loading the module.
     *
     * @returns {Array} An array containing the name of the function "addDefault".
     */
    autoinvoked() {
        return ["addDefault"];
    }


}

module.exports = Man;





