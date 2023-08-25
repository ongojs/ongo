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
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { createReadStream, promises } = require("fs");
const colors = require('../../../couleurs')();
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

    const textAligner = (...args) => {
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

    const verticalSpace = (NumberOfLines) => {
        NumberOfLines =
            typeof NumberOfLines === "number" && NumberOfLines > 0
                ? NumberOfLines
                : 1;
        for (let i = 0; i < NumberOfLines; i++) {
            console.log("");
        }
    }
    // horizontal line accross the screen
    const horizontalLine = () => {
        const width = process.stdout.columns;
        let line = "";
        for (let i = 0; i < width; i++) {
            line += "-";
        }
        console.log(line);
    }

    // create centered text on the screen
    const centered = (str) => {
        str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";
        const width = process.stdout.columns;
        // calculate left padding
        const leftPadding = Math.floor((width - str.length) / 2);
        // put in left padding space before the string
        let line = "";
        for (let i = 0; i < leftPadding; i++) {
            line += " ";
        }
        line += str;
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

    const description = (str) => {
        str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";
        const width = process.stdout.columns;
        // calculate left padding
        const leftPadding = Math.floor((width - str.length) / 4);
        // put in left padding space before the string
        let line = "";
        for (let i = 0; i < leftPadding; i++) {
            line += " ";
        }
        line += str;
        console.log(line);
    }
    const manual = (str) => {
        str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";
        const width = process.stdout.columns;
        // calculate left padding
        const leftPadding = Math.floor((width - str.length) / 4);
        // put in left padding space before the string
        let line = "";
        for (let i = 0; i < leftPadding; i++) {
            line += " ";
        }
        line += str;
        console.log(line);
    }

    const objectToDisplay = (...args) => {
        let option = {};
        option.object = {};
        option.options = {};
        if (args.length === undefined || args.length === 0) {
            return option;
        }
        if (args.length >= 1) {
            for (let i = 0; i < args.length; i++) {
                if (typeof args[i] === "object") {
                    if (
                        !args[i].hasOwnProperty("object") &&
                        !args[i].hasOwnProperty("options")
                    ) {
                        option.object = args[i];
                        args[i] = option;
                    }
                    if (
                        args[i].hasOwnProperty("object") &&
                        !args[i].hasOwnProperty("options")
                    ) {
                        option.object = args[i]["object"];
                        args[i] = option;
                    }
                    if (
                        !args[i].hasOwnProperty("object") &&
                        args[i].hasOwnProperty("options")
                    ) {
                        option.options = args[i]["options"];
                        args[i] = option;
                    }
                } else if (typeof args[i] !== "object") {
                    if (
                        !args[i].hasOwnProperty("object") &&
                        args[i].hasOwnProperty("options")
                    ) {
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
        }
        return args;
    }
    const displayer = (...args) => {
        let option = {
            showHidden: true,
            depth: 10,
            colors: true,
            showProxy: true,
            maxArrayLength: 100,
            maxArrayLength: Infinity,
            compact: true,
            sorted: true,
        };

        let dargs = {};
        dargs.object = {
            data: "no data",
        };
        dargs.options = option;

        if (args.length === undefined || args.length === 0) {
            console.log(util.inspect(dargs.object, dargs.options));
            return;
        }
        if (args.length >= 1) {
            for (let i = 0; i < args.length; i++) {
                if (typeof args[i] === "object") {
                    if (
                        args[i].hasOwnProperty("object") &&
                        args[i].hasOwnProperty("options")
                    ) {
                        if (JSON.stringify(args[i]["options"]) !== "{}") {
                            for (let prop in args[i]["options"]) {
                                if (option.hasOwnProperty(prop)) {
                                    option[prop] = args[i]["options"][prop];
                                }
                            }
                        }
                        console.log(util.inspect(args[i]["object"], option));
                    } else if (
                        args[i].hasOwnProperty("object") &&
                        !args[i].hasOwnProperty("options")
                    ) {
                        console.log(util.inspect(args[i]["object"], option));
                    } else if (!args[i].hasOwnProperty("object")) {
                        console.log(util.inspect(dargs.object, dargs.options));
                    }
                } else {
                    console.log(args[i], "here");
                }
            }
        }
    }
    const display = (object) => {
        displayer(...objectToDisplay(object));
    }
    const padding = (...args) => {
        let options = {
            string: "-",
            number: process.stdout.columns,
            color: 37,
        };
        if (args.length === undefined || args.length === 0) {
            // calculate left padding
            let padding = Math.floor(
                (process.stdout.columns - options.string.length) / options.number
            );
            // put in left padding space before the string
            let line = "";
            for (let i = 0; i < padding; i++) {
                line += " ";
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`;
            console.log(line);
            return;
        }

        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "object") {
                for (let prop in args[i]) {
                    let checkProp = prop === "number" && args[i][prop] <= 0 ? 1 : prop;
                    if (options.hasOwnProperty(checkProp)) {
                        options[checkProp] = args[i][checkProp];
                    }
                }
            } else {
                // calculate left padding
                let padding = Math.floor(
                    (process.stdout.columns - options.string.length) / options.number
                );
                // put in left padding space before the string
                let line = "";
                for (let i = 0; i < padding; i++) {
                    line += " ";
                }
                line += `\x1b[${options.color}m${options.string}\x1b[0m`;
                console.log(line);
            }
            // calculate left padding
            let padding = Math.floor(
                (process.stdout.columns - options.string.length) / options.number
            );
            // put in left padding space before the string
            let line = "";
            for (let i = 0; i < padding; i++) {
                line += " ";
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`;
            console.log(line);
        }
    }


    const pluralize = (item, quantiy) => {
        return quantiy > 1 ? `${item}s` : `${item}`;
    }
    const spliter = (str, spl) => {
        if (str === undefined || spl === undefined) return [];
        return str
            .split(spl)
            .filter((string) => string != "")
            .map((st) => st.trim());
    }
    const clean = (string) => {
        return string
            .split(" ")
            .filter((str) => str != "")
            .map((str) => str.trim())
            .join(" ");
    }

    const eventList = () => ([
        'model',
        'method',
        "man",
        "clear",
        "help",
        "exit",
        "quit",
        "leave",
        "admin",
        "login",
        "logout",
        "frontend",
        "list",
        "--list"
    ]);
    

    const main = (Observable, string) => {
        string =
            typeof string === "string" && string.trim().length > 0
                ? string.trim()
                : false;
        if (string) {
            let commandEvent = false;
            let event = eventList().find(
                (event) =>
                    string.trim().toLowerCase().indexOf(event) > -1 &&
                    string.startsWith(event)
            );

            if (event) {
                commandEvent = true;

                Observable.emit(event, string);
                return true;
            }
            if (commandEvent === false) {
                Observable.removeDuplicateListeners("command-not-found");
                return Observable.emit("command-not-found", {
                    error: `'${string}' is not command`,
                });
            }
        } else {
            return;
        }
    }

    const run = async (Obervable = {}, command = "ls", options = {}) => {
        console.clear();
        // const { stdout, error, stderr} =
        await exec(command, options);
        Obervable.prompt();
    }

    const login = (Obervable = {}) => {
        const incorrectpassword = (value, message) => {
            Obervable.question("Password: ", (passwrd) => {
                if (passwrd === "exit" || passwrd === "quit" || passwrd === "leave") {
                    return Obervable.prompt();
                } else if (value !== hash(passwrd)) {
                    if (passwrd.length === 0) {
                        console.log(`\x1b[31mpassword required\x1b[0m`);
                    } else if (
                        isValid(regexes().passwordregex, passwrd) === false &&
                        passwrd.length > 0
                    ) {
                        console.log(`\x1b[31minvalid password\x1b[0m`);
                    } else {
                        console.log(`\x1b[31mwrong password\x1b[0m`);
                    }
                    incorrectpassword(value, message);
                } else if (value === hash(passwrd)) {
                    Obervable.emit("login:password:correct", value);
                }
            });

            Obervable.on("login:password:correct", (value) => {
                Obervable.emit("login:allowed", value);
            });
        };

        const onlogin = (user) => {
            let authUser = {};
            console.clear();
            delete user.aToken;
            delete user.password;
            console.log();
            this.getAuthUser = user;
            let welcome = ` WELCOME ${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}!`;
            let name = `${user.firstname} ${user.lastname}`;

            authUser[`\x1b[35mDETAILS\x1b[0m`] = [];
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = name;
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mPHONE\x1b[0m`] = user.phone;
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mJOINED ON\x1b[0m`] =
                user.created_at;
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mAS OF NOW\x1b[0m`] =
                ontimemessage(user.created_at);
            // authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mEMAIL\x1b[0m`] = user.email

            Obervable.removeDuplicateListeners("error");
            if (user.is_admin === false) {
                Obervable.emit("error", {
                    error: " You do not have admin privileges.",
                });
                Obervable.prompt();
                return;
            }
            Obervable.auth = true;
            let authoptions = {
                string: welcome,
                number: process.stdout.columns,
                color: 36,
            };
            padding(authoptions);
            console.table(authUser);
        };

        Obervable.on("login", () => {
            let user,
                hashed,
                authUser = {};

                Obervable.question("Phone Number: ", (phone) => {
                phone = clean(phone);

                if (phone === "exit" || phone === "quit" || phone === "leave") {
                    return Obervable.prompt();
                }
                if (phone.length === 0) {
                    console.log(
                        "\x1b[31m%s\x1b[0m",
                        `admin phone number required! ('exit' to exit)`
                    );
                    Obervable.emit("login");
                }
                if (
                    isValid(regexes().phoneregex, phone) === false &&
                    phone.length !== 0
                ) {
                    console.log(
                        "\x1b[31m%s\x1b[0m",
                        `Invalid phone number! ('exit' to exit)`
                    );
                    Obervable.emit("login");
                }
                Obervable.question("Password: ", (password) => {
                    password = clean(password);
                    if (password.length === 0) {
                        console.log(`\x1b[31mPassword required!\x1b[0m`);
                    }
                    let path = `${base()}/users/${phone}.json`;
                    let readable = createReadStream(path, "utf-8");

                    readable.on("error", (error) => {
                        console.log(`\x1b[31mUnrecognized Phone number\x1b[0m`);
                        Obervable.emit("login");
                    });
                    readable.on("data", (chunk) => {
                        user = JSON.parse(chunk);
                        hashed = hash(password);
                    });
                    readable.on("end", () => {
                        if (password.length === 0) {
                            incorrectpassword(user.password, "password required");
                            Obervable.on("login:allowed", (value) => {
                                onlogin(user);
                            });
                        } else if (
                            isValid(regexes().passwordregex, password) === false &&
                            password.length > 0
                        ) {
                            incorrectpassword(user.password, "invalid password");
                            Obervable.on("login:allowed", (value) => {
                                onlogin(user);
                            });
                        } else if (user.password !== hash(password)) {
                            incorrectpassword(user.password, "wrong password");
                            Obervable.on("login:allowed", (value) => {
                                onlogin(user);
                            });
                        } else if (user.password === hash(password)) {
                            onlogin(user);
                        }
                    });
                });
            });
        });
    }


    const completer = (line) => {
        const completions = ".help .error .exit .quit .q".split(" ");
        const hits = completions.filter((c) => c.startsWith(line));
        // Show all completions if none found
        return [hits.length ? hits : completions, line];
    }
    const command = (string, index = 1) => {
        return string.split(' ').filter(str => str.trim().length > 0)[index];
    }
    const common = (Obervable = {}) => {
        Obervable.on("clear", () => {
            console.clear();
        });
        Obervable.on("exit", () => {
            Obervable.close();
        });
        Obervable.on("leave", () => {
            Obervable.close();
        });
        Obervable.on("quit", () => {
            Obervable.close();
        });
        Obervable.on('home', () => {
            console.log('Welcom Home',)
        })
    }

    
    const invalidCommand = (Obervable = {}) => {
        Obervable.on("command-not-found", (data) => {
            console.log();
            console.log(`\x1b[31m${data.error}\x1b[0m`);
            console.log();
            Obervable.prompt();
            //process.exit(0)
        });

        Obervable.on("error", (data) => {
            console.log();
            console.log(`\x1b[31m${data.error}\x1b[0m`);
            console.log();
            Obervable.prompt();
            // process.exit(0)
        });
        Obervable.on("success", (data) => {
            console.log(`\x1b[36m${data.message}\x1b[0m`);
        });
    }

    const infos = (object, depth = 1) => {
        console.log(
            util.inspect(object, {
                showHidden: true,
                colors: true,
                depth: depth,
            })
        );
    }

    const base = () => {
        return path.join(__dirname, "../../resources/storage/.data");
    }
    const findAll = async (path) => {
        return await promises.readdir(`${this.base()}/${path}`);
    }
    const hash = (string) => {
        if (typeof string === "string" && string.trim().length > 0) {
            return require("crypto")
                .createHmac("sha256", "HolyMole!IsThisTheHashingSecret?")
                .update(string)
                .digest("hex");
        } else {
            return false;
        }
    }

    const cliOptions = () => ({
        pad: 22,
        position: process.stdout.columns,
        hline: false,
        keyColor: "36",
        valueColor: "37",
    })
    const cmds = () => ({
        "MODEL:": "\x1b[34mType \x1b[33mmodel\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mmodel man page (main commands)\x1b[0m\x1b[0m",
        "HOME:": "\x1b[34mType \x1b[33mhome\x1b[0m \x1b[34manytime to return to this page\x1b[0m",
        // "HELP:": "\x1b[34mType \x1b[33mhelp,?,--help,-h\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mmodel man page (main commands)\x1b[0m\x1b[0m",
        "EXIT:": "\x1b[34mType \x1b[33mexit,leave\x1b[0m \x1b[34mto exit this terminal\x1b[0m",
    });
    const initObservable = (Obervable = {}) => {
        Obervable.setPrompt(`[\x1b[32mmongodb model: \x1b[0m`);
        console.clear();
        horizontalLine();

        centered("\x1b[34mMONGODB MODEL ssssMAIN COMMAND LINE INTERFACE (CLI).\x1b[0m");
        horizontalLine();
        console.log("");
       
        textAligner(cliOptions(), cmds());
        verticalSpace();
        horizontalLine();
        verticalSpace();
        Obervable.prompt();

        Obervable.on("line", (string) => {

            main(Obervable, string);
            Obervable.prompt();
        })
            .on("pause", () => {
                //console.log('waiting for you ....')
            })
            .on("resume", () => {
                console.log('resumed ....')
            })
            // .on('SIGINT', () => {
            //     this.question('Are you sure you want to exit? ', (answer) => {
            //       if (answer.match(/^y(es)?$/i)) this.close()
            //     })
            //   })
            .on("SIGCONT", () => {
                // `prompt` will automatically resume the stream
                this.prompt();
            })
            .on("SIGTSTP", () => {
                // This will override SIGTSTP and prevent the program from going to the
                // background.
                //console.log('Caught SIGTSTP.')
            })
            .on("close", () => {
                console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Goobye. Have a wonderful and lovely one!"
                );
                process.exit(0);
            });
    }


    

    const cmd = () => ({
        textAligner,
        verticalSpace,
        horizontalLine,
        centered,
        description,
        manual,
        objectToDisplay,
        displayer,
        display,
        padding,
        pluralize,
        spliter,
        clean,
        main,
        run,
        login,
        completer,
        command,
        common,
        invalidCommand,
        infos,
        base,
        findAll,
        hash,
        initObservable,
        cliOptions
    })


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
    | the cmd object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = cmd;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.cmd.
    |
    */

    else global.cmd = cmd;
})(this)