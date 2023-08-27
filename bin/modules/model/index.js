'use strict';

const Man = require("../../../src/modules/model/modules/man");
const Couleur = require("../../../src/modules/model/modules/couleurs");
const Schema = require("../../../src/modules/model/modules/schema");
const Migrate = require("../../../src/modules/model/modules/db-migrate");
const Migration = require("../../../src/modules/model/modules/db-migration");
const ModelCli = require('../../../src/modules/model/modules/cli/modules/model')

const Model = require('../../../src/modules/model/lib/command/cli');
// const Method = require("method");

const lib = require('../../../src/modules/model/lib');//().Commands()

const { ModelCommand } = lib().Commands();

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

    const cli = (fnCommand = () => { }) => {

        switch (fnCommand(3)) {
            case "model":
                // const {BIRed} = new Couleur
                if (!fnCommand(3) || fnCommand(3).trim().length === 0) {
                    new Man({ command: fnCommand(3) }).man("man");
                } else {
                    switch (fnCommand(4)) {
                        case "h":
                            new Man({ command: fnCommand(4) }).man("man");
                            break;
                        case "help":

                            new Man({ command: fnCommand(4) }).man("man");
                            break;
                        case "--help":

                            new Man({ command: fnCommand(4) }).man("man");
                            break;
                        // case "cli":
                        //     new ModelCli()
                        //     break;
                        case "-h":
                            new Man({ command: fnCommand(4) }).man("man");
                            break;
                        case "man":

                            new Man({ command: fnCommand(4) }).man("man");
                            break;
                        case "--man":
                            new Man({ command: fnCommands(4) }).man("man");
                            break;
                        // case "method":
                        //   new MethodCommand().method()
                        //   break;
                        case "list":
                            //console.log('models')
                            new ModelCommand().list()
                            break;
                        case "make:model":

                            const { makeModel } = new ModelCommand
                            makeModel();
                            // console.log('make:model', makeModel);
                            break;
                        case "make:schema":
                            // console.log('make:schma')
                            const { makeSchema, hasType } = new Schema({ command: fnCommand(4) })
                            if (fnCommand(6)) {
                                if (hasType(fnCommand(6))) {
                                    makeSchema(fnCommand(5), fnCommand(6));
                                } else {
                                    console.log(`invalid argument for make:schema ${fnCommand(5)}`);
                                }

                            } else {
                                makeSchema(fnCommand(3));
                            }

                            break;
                        case "make:migration":
                            //console.log('make migration')
                            //new MigrationCommand().makeMigration()
                            if (fnCommand(4)) {
                                const { makeMigration, hasType } = new Migration({ command: fnCommand(3) })
                                if (fnCommand(5)) {
                                    if (hasType(fnCommand(5))) {
                                        makeMigration(fnCommand(4), fnCommand(5));
                                    } else {
                                        console.log(`invalid argument for make:migration ${fnCommand(4)}`);
                                    }
                                } else {
                                    makeMigration(fnCommand(4));
                                }
                            } else {
                                console.log('make:migration command adfdasf', fnCommand(4));
                            }
                            break;
                        // case "migrate":

                        // console.log('migrate')
                        //   //new MigrateCommand().migrate();
                        //   break;
                        case "migrate":
                            const { migrate, migrateSchema, migrateMigration, migrateAll } = new Migrate({ command: fnCommand(3) })
                            if (fnCommand(4)) {
                                if (fnCommand(4).startsWith('--schema=')) {
                                    migrateSchema(fnCommand(4))
                                    migrateMigration(fnCommand(4))
                                } else {
                                    console.log(`invalid argument. Must be like --schema=<Schema Name>`);
                                }
                            } else {
                                migrateAll(fnCommand(3))
                            }
                            break;
                        case "--model=":
                            console.log('--model=')
                            break;
                        case "-M":
                            console.log('-M')
                            break;
                        default:
                            if (fnCommand(4) && typeof (fnCommand(4) === 'string') && fnCommand(4).trim().length > 0) {
                                // return console.log('here we go')
                                if (fnCommand(4)) {
                                    if (fnCommand(5)) {
                                        const { make } = new Model({ command: fnCommand(3) });
                                        // return console.log(new Model)
                                        make(fnCommand(4));
                                        // this.makeModelCommandFour()
                                    } else {
                                        const { make } = new Model({ command: fnCommand(3) });
                                        make(fnCommand(4));
                                        // return console.log(new Model)
                                    }
                                } else {
                                    console.log(Red('unrecognized command'))
                                }
                            } else {
                                console.log('invalid argument')
                            }
                            // new Man({ command: fnCommands(2) }).man("man");
                            //console.log(BIRed(`${fnCommands(2)} is not command`));
                            break;
                    }
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
    | the cli object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = cli;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.cli.
    |
    */

    else global.cli = cli;
})(this)