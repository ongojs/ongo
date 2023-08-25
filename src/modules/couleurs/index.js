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
    * Generates an object with color and text styling methods.
    * @returns {Object} An object with color and text styling methods.
    */

    const couleurs = () => ({
        // Reset
        Color_Off: (string = 'coloring?') => `\x1b[0m${string.toString()}\x1b[0m`, //'\033[0m',       // Text Reset
        // Regular Colors
        Black: (string = 'coloring?') => `\x1b[0;30m${string.toString()}\x1b[0m`,//'\033[0;30m',        // Black
        Red: (string = 'coloring?') => `\x1b[0;31m${string.toString()}\x1b[0m`,//'\033[0;31m',          // Red
        Green: (string = 'coloring?') => `\x1b[0;32m${string.toString()}\x1b[0m`,//'\033[0;32m',        // Green
        Yellow: (string = 'coloring?') => `\x1b[0;33m${string.toString()}\x1b[0m`,//'\033[0;33m',       // Yellow
        Blue: (string = 'coloring?') => `\x1b[0;34m${string.toString()}\x1b[0m`,//'\033[0;34m',         // Blue
        Purple: (string = 'coloring?') => `\x1b[0;35m${string.toString()}\x1b[0m`,//'\033[0;35m',       // Purple
        Cyan: (string = 'coloring?') => `\x1b[0;36m${string.toString()}\x1b[0m`,//'\033[0;36m',         // Cyan
        White: (string = 'coloring?') => `\x1b[0;37m${string.toString()}\x1b[0m`,//'\033[0;37m',        // White

        // Bold
        BBlack: (string = 'coloring?') => `\x1b[1;30m${string.toString()}\x1b[0m`,// '\033[1;30m',       // Black
        BRed: (string = 'coloring?') => `\x1b[1;31m${string.toString()}\x1b[0m`,//'\033[1;31m',         // Red
        BGreen: (string = 'coloring?') => `\x1b[1;32m${string.toString()}\x1b[0m`,//'\033[1;32m',       // Green
        BYellow: (string = 'coloring?') => `\x1b[1;33m${string.toString()}\x1b[0m`,//'\033[1;33m',      // Yellow
        BBlue: (string = 'coloring?') => `\x1b[1;34m${string.toString()}\x1b[0m`,//'\033[1;34m',        // Blue
        BPurple: (string = 'coloring?') => `\x1b[1;35m${string.toString()}\x1b[0m`,//'\033[1;35m',      // Purple
        BCyan: (string = 'coloring?') => `\x1b[1;36m${string.toString()}\x1b[0m`,//'\033[1;36m',        // Cyan
        BWhite: (string = 'coloring?') => `\x1b[1;37m${string.toString()}\x1b[0m`,//'\033[1;37m',       // White

        // Underline
        UBlack: (string = 'coloring?') => `\x1b[4;30m${string.toString()}\x1b[0m`,//'\033[4;30m',       // Black
        URed: (string = 'coloring?') => `\x1b[4;31m${string.toString()}\x1b[0m`,//'\033[4;31m',         // Red
        UGreen: (string = 'coloring?') => `\x1b[4;32m${string.toString()}\x1b[0m`,//'\033[4;32m',       // Green
        UYellow: (string = 'coloring?') => `\x1b[4;33m${string.toString()}\x1b[0m`,//'\033[4;33m',      // Yellow
        UBlue: (string = 'coloring?') => `\x1b[4;34m${string.toString()}\x1b[0m`,//'\033[4;34m',        // Blue
        UPurple: (string = 'coloring?') => `\x1b[4;35m${string.toString()}\x1b[0m`,//'\033[4;35m',      // Purple
        UCyan: (string = 'coloring?') => `\x1b[4;36m${string.toString()}\x1b[0m`,//'\033[4;36m',        // Cyan
        UWhite: (string = 'coloring?') => `\x1b[4;37m${string.toString()}\x1b[0m`,//'\033[4;37m',       // White

        // Background
        On_Black: (string = 'coloring?') => `\x1b[40m${string.toString()}\x1b[0m`,//'\033[40m',       // Black
        On_Red: (string = 'coloring?') => `\x1b[41m${string.toString()}\x1b[0m`,//'\033[41m',         // Red
        On_Green: (string = 'coloring?') => `\x1b[42m${string.toString()}\x1b[0m`,//'\033[42m',       // Green
        On_Yellow: (string = 'coloring?') => `\x1b[43m${string.toString()}\x1b[0m`,//'\033[43m',      // Yellow
        On_Blue: (string = 'coloring?') => `\x1b[44m${string.toString()}\x1b[0m`,//'\033[44m',        // Blue
        On_Purple: (string = 'coloring?') => `\x1b[45m${string.toString()}\x1b[0m`,//'\033[45m',      // Purple
        On_Cyan: (string = 'coloring?') => `\x1b[46m${string.toString()}\x1b[0m`,//'\033[46m',        // Cyan
        On_White: (string = 'coloring?') => `\x1b[47m${string.toString()}\x1b[0m`,//'\033[47m',       // White

        // High Intensity
        IBlack: (string = 'coloring?') => `\x1b[0;90m${string.toString()}\x1b[0m`,//'\033[0;90m',       // Black
        IRed: (string = 'coloring?') => `\x1b[0;91m${string.toString()}\x1b[0m`,//'\033[0;91m',         // Red
        IGreen: (string = 'coloring?') => `\x1b[0;92m${string.toString()}\x1b[0m`,//'\033[0;92m',       // Green
        IYellow: (string = 'coloring?') => `\x1b[0;93m${string.toString()}\x1b[0m`,//'\033[0;93m',      // Yellow
        IBlue: (string = 'coloring?') => `\x1b[0;94m${string.toString()}\x1b[0m`,//'\033[0;94m',        // Blue
        IPurple: (string = 'coloring?') => `\x1b[0;95m${string.toString()}\x1b[0m`,//'\033[0;95m',      // Purple
        ICyan: (string = 'coloring?') => `\x1b[0;96m${string.toString()}\x1b[0m`,//'\033[0;96m',        // Cyan
        IWhite: (string = 'coloring?') => `\x1b[0;97m${string.toString()}\x1b[0m`,//'\033[0;97m',       // White

        // Bold High Intensity
        BIBlack: (string = 'coloring?') => `\x1b[1;90m${string.toString()}\x1b[0m`,//'\033[1;90m',      // Black
        BIRed: (string = 'coloring?') => `\x1b[1;91m${string.toString()}\x1b[0m`,//'\033[1;91m',        // Red
        BIGreen: (string = 'coloring?') => `\x1b[1;92m${string.toString()}\x1b[0m`,//'\033[1;92m',      // Green
        BIYellow: (string = 'coloring?') => `\x1b[1;93m${string.toString()}\x1b[0m`,//'\033[1;93m',     // Yellow
        BIBlue: (string = 'coloring?') => `\x1b[1;94m${string.toString()}\x1b[0m`,//'\033[1;94m',       // Blue
        BIPurple: (string = 'coloring?') => `\x1b[1;95m${string.toString()}\x1b[0m`,//'\033[1;95m',     // Purple
        BICyan: (string = 'coloring?') => `\x1b[1;96m${string.toString()}\x1b[0m`,//'\033[1;96m',       // Cyan
        BIWhite: (string = 'coloring?') => `\x1b[1;97m${string.toString()}\x1b[0m`,//'\033[1;97m',      // White

        // High Intensity backgrounds
        On_IBlack: (string = 'coloring?') => `\x1b[0;100m${string.toString()}\x1b[0m`,//'\033[0;100m',   // Black
        On_IRed: (string = 'coloring?') => `\x1b[0;101m${string.toString()}\x1b[0m`,//'\033[0;101m',     // Red
        On_IGreen: (string = 'coloring?') => `\x1b[0;102m${string.toString()}\x1b[0m`,//'\033[0;102m',   // Green
        On_IYellow: (string = 'coloring?') => `\x1b[0;103m${string.toString()}\x1b[0m`,//'\033[0;103m',  // Yellow
        On_IBlue: (string = 'coloring?') => `\x1b[0;104m${string.toString()}\x1b[0m`,//'\033[0;104m',    // Blue
        On_IPurple: (string = 'coloring?') => `\x1b[0;105m${string.toString()}\x1b[0m`,//'\033[0;105m',  // Purple
        On_ICyan: (string = 'coloring?') => `\x1b[0;106m${string.toString()}\x1b[0m`,//'\033[0;106m',    // Cyan
        On_IWhite: (string = 'coloring?') => `\x1b[0;107m${string.toString()}\x1b[0m`,//'\033[0;107m',   // White
        //
        Reset: (string = 'coloring?') => `\x1b[0m${string.toString()}\x1b[0m`,//'\e[0m',
        Bright: (string = 'coloring?') => `\x1b[1m${string.toString()}\x1b[0m`,
        Dim: (string = 'coloring?') => `\x1b[2m${string.toString()}\x1b[0m`,//'\e[2m',
        Underscore: (string = 'coloring?') => `\x1b[4m${string.toString()}\x1b[0m`,//'\e[4m',
        Blink: (string = 'coloring?') => `\x1b[5m${string.toString()}\x1b[0m`,//'\e[5m',
        Reverse: (string = 'coloring?') => `\x1b[7m${string.toString()}\x1b[0m`,//'\e[7m',
        Hidden: (string = 'coloring?') => `\x1b[8m${string.toString()}\x1b[0m`,//'\e[8m',

        FgBlack: (string = 'coloring?') => `\x1b[30m${string.toString()}\x1b[0m`,//'\e[30m',
        FgRed: (string = 'coloring?') => `\x1b[31m${string.toString()}\x1b[0m`,//'\e[31m',
        FgGreen: (string = 'coloring?') => `\x1b[32m${string.toString()}\x1b[0m`,//'\e[32m',
        FgYellow: (string = 'coloring?') => `\x1b[33m${string.toString()}\x1b[0m`,//'\e[33m',
        FgBlue: (string = 'coloring?') => `\x1b[34m${string.toString()}\x1b[0m`,//'\e[34m',
        FgMagenta: (string = 'coloring?') => `\x1b[35m${string.toString()}\x1b[0m`,//'\e[35m',
        FgCyan: (string = 'coloring?') => `\x1b[36m${string.toString()}\x1b[0m`,//'\e[36m',
        FgWhite: (string = 'coloring?') => `\x1b[37m${string.toString()}\x1b[0m`,//'\e[37m',

        BgBlack: (string = 'coloring?') => `\x1b[40m${string.toString()}\x1b[0m`,//'\e[40m',
        BgRed: (string = 'coloring?') => `\x1b[41m${string.toString()}\x1b[0m`,//'\e[41m',
        BgGreen: (string = 'coloring?') => `\x1b[42m${string.toString()}\x1b[0m`,//'\e[42m',
        BgYellow: (string = 'coloring?') => `\x1b[43m${string.toString()}\x1b[0m`,//'\e[43m',
        BgBlue: (string = 'coloring?') => `\x1b[44m${string.toString()}\x1b[0m`,//'\e[44m',
        BgMagenta: (string = 'coloring?') => `\x1b[45m${string.toString()}\x1b[0m`,//'\e[45m',
        BgCyan: (string = 'coloring?') => `\x1b[46m${string.toString()}\x1b[0m`,//'\e[46m',
        BgWhite: (string = 'coloring?') => `\x1b[47m${string.toString()}\x1b[0m`,//'\e[47m',

        SetColor: (string = 'coloring!', R = 30, G = 2, B = 208) => (Number.isInteger(R) && Number.isInteger(G) && Number.isInteger(G)) ? `\x1b[${R};${G};${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Underline: (string = 'coloring!', R = 30, B = 208) => (Number.isInteger(R) && Number.isInteger(B)) ? `\x1b[${R};4;${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Strikethrough: (string = 'coloring!', R = 30, B = 208) => (Number.isInteger(R) && Number.isInteger(B)) ? `\x1b[${R};9;${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Bold: (string = 'coloring!', R = 30, B = 208) => (Number.isInteger(R) && Number.isInteger(B)) ? `\x1b[${R};1;${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Italic: (string = 'coloring!', R = 30, B = 208) => (Number.isInteger(R) && Number.isInteger(B)) ? `\x1b[${R};3;${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Highlight: (string = 'coloring!', R = 30, B = 208) => (Number.isInteger(R) && Number.isInteger(B)) ? `\x1b[${R};7;${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Hide: (string = 'coloring!', R = 30, B = 208) => (Number.isInteger(R) && Number.isInteger(B)) ? `\x1b[${R};8;${B}m${string.toString()}\x1b[0m` : new Error('invalid input'),
        Blinker: (string = 'coloring!', R = 30, G = 2) => (Number.isInteger(R) && Number.isInteger(G)) ? `\x1b[${R};${G};5m${string.toString()}\x1b[0m` : new Error('invalid input'),
    })

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the couleurs object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = couleurs;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.couleurs.
    |
    */

    else global.couleurs = couleurs;
})(this)