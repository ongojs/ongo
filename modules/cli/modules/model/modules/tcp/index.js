#!/usr/bin/env node

"use strict";

/**
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module CLI
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc CLI class
 */


const Model  = require('../../../../')
const couleurs = require('../../../couleurs')()

const cmd = require('../cmd')();
class TCPCLI extends require("../../CLI") {

  constructor(...arrayOfObjects) {

    super({
        input: process.stdin,
        output: process.stdout,
        prompt: ``,
        historySize: 1000,
        crlfDelay: Infinity,
        removeHistoryDuplicates: false,
        escapeCodeTimeout: 500,
        completer: line => {
            const completions = ['help', 'list', 'create', 'delete', 'exit'];
            const hits = completions.filter((c) => c.startsWith(line));
            return [hits.length ? hits : completions, line];
        },
        terminal: true,
    });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(TCPCLI);
    // auto invoke methods
    this.autoinvoker(TCPCLI);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  topEventList(){
    return [
        'man',
        'help',
        'model',
        "clear",
        "help",
        "exit",
        "quit",
        "leave",
        '?',
        'make:model',
        'make:schema',
        'make:migration',
        'migrate',
        'collection',
        'list', 
        '--list',
        'tcp',
        'http',
        'https',
        'playground'
    ]
}

cliOptions() {
  return {
    pad: 22,
    position: process.stdout.columns,
    hline: false,
    keyColor: "36",
    valueColor: "37",
}
} 
cmds (){
    return {
        "MODEL:":
            "\x1b[34mType \x1b[33mmodel\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mmodel man page (main commands)\x1b[0m\x1b[0m",
        "TCP:": "\x1b[34mType \x1b[33mtcp\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mtcp man page (main commands)\x1b[0m\x1b[0m",
        "HTTP:": "\x1b[34mType \x1b[33mhttp\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mhttp man page (main commands)\x1b[0m\x1b[0m",
        "HTTPS:": "\x1b[34mType \x1b[33mhttps\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mhttps man page (main commands)\x1b[0m\x1b[0m",
        "PLAYGROUND:": "\x1b[34mType \x1b[33mplayground\x1b[0m \x1b[34mfor\x1b[0m \x1b[34mthe main  \x1b[33mplayground man page (main commands)\x1b[0m\x1b[0m",
        "LOGOUT:": `\x1b[34mType \x1b[33mlogout\x1b[0m \x1b[34mfor logging out\x1b[0m`,
    }
}
    
  main (string) {
    string =
        typeof string === "string" && string.trim().length > 0
            ? string.trim()
            : false;
    if (string) {
        let commandEvent = false;
        let event = this.topEventList().find(
            (event) =>
                string.trim().toLowerCase().indexOf(event) > -1 &&
                string.startsWith(event)
        );

        if (event) {
            commandEvent = true;

            this.emit(event, string);
            return true;
        }
        if (commandEvent === false) {
            this.removeDuplicateListeners("command-not-found");
            return this.emit("command-not-found", {
                error: `'${string}' is not command`,
            });
        }
    } else {
        return;
    }
}
  init() {
    this.setPrompt(`[\x1b[32mmongodb model: \x1b[0m`);
    console.clear();
    cmd.horizontalLine();

    cmd.centered("\x1b[34mMONGODB MODEL MAIN COMMAND LINE INTERFACE (CLI).\x1b[0m");
    cmd.horizontalLine();
    //this.centered(`\x1b[32mUSERS COMMANDS HELP AND USAGE MANUAL\x1b[0m`)

    //this.description(centered)

    //this.verticalSpace(2)

    // const options = {
    //     pad: 22,
    //     position: process.stdout.columns,
    //     hline: false,
    //     keyColor: "36",
    //     valueColor: "37",
    // };

    // console.log('\x1b[34m%s\x1b[0m', 'CLI and server are running on port 3000.')
    // console.log('\x1b[36m%s\x1b[0m', `Type 'help' or 'man' for CLI usage`)
    console.log("");
   
    cmd.textAligner(this.cliOptions(), this.cmds());
    cmd.verticalSpace();
    cmd.horizontalLine();
    cmd.verticalSpace();
    this.prompt();

    this.on("line", (string) => {

        this.main(string);
        this.prompt();
    })
        .on("pause", () => {
            console.log('waiting for you ....')
        })
        .on("resume", () => {
            console.log('resumed ....')
        })
        .on('SIGINT', () => {
            this.question('Are you sure you want to exit? y(es) or no ', (answer) => {
              if (answer.match(/^y(es)?$/i)) this.close()
            })
          })
        .on("SIGCONT", () => {
            // `prompt` will automatically resume the stream
            this.prompt();
        })
        .on("SIGTSTP", () => {
            // This will override SIGTSTP and prevent the program from going to the
            // background.
            console.log('Caught SIGTSTP.')
        })
        .on("close", () => {
            console.log(
                "\x1b[36m%s\x1b[0m",
                "Goobye. Have a wonderful and lovely one!"
            );
            process.exit(0);
        });
}

    commands(){
        return  {
            '\x1b[36mman\x1b[0m': '                  model man page: [\x1b[36mman\x1b[0m] ',
            '\x1b[36m--help\x1b[0m or \x1b[36m-h\x1b[0m': '         Help: [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m\x1b[0m\x1b[0m]',
            '\x1b[36mmake:model\x1b[0m': '           Make model: [\x1b[36mmake:model\x1b[0m\x1b[0m\x1b[0m] model_name',
            '\x1b[36mmake:migration\x1b[0m': '       Make migration: [\x1b[36mmake:migration\x1b[0m\x1b[0m] migration_name',
            '\x1b[36mmake:schema\x1b[0m': '          Make schema: [\x1b[36mmake:schema\x1b[0m\x1b[0m\x1b[0m] schema_name',
            '\x1b[36mmigrate\x1b[0m ': '             Migrate: [\x1b[36m--schema=\x1b[0m|\x1b[36m-s\x1b[0m]schema_name'
    
        }
    }
    centered () {
    return `\x1b[36mNAME\x1b[0m
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
    } 
    defaultDisplay() {

      

        // let clean = string.split(' ').filter(str => str !== '').join(' ')


       // if (string === 'man' || string === ' -h' || string === '--help' || string === 'help') {
            console.clear()

            //this.horizontalLine()
            cmd.centered(`\x1b[32mMODEL COMMANDS AND USAGE MANUAL\x1b[0m`)
            //this.horizontalLine()
            cmd.description(this.centered())
            //this.horizontalLine()
            cmd.verticalSpace(2)

            const options = { pad: 13, position: process.stdout.columns, hline: false, keyColor: '36', valueColor: '37' }
            cmd.textAligner(options, this.commands())
            console.log()
        //}
    }
     mainCommand(){
        this.on('tcp', string => {
            this.setPrompt( `${couleurs.FgMagenta('[tcp: ')}`);


            while (this.getPrompt() ==='[model: '){
               return console.log('here');
            }
             
        
            if(!cmd.command(string, 1) || cmd.command(string, 1).trim().length === 0) return this.defaultDisplay()
            if(!this.topEventList().includes(cmd.command(string, 1))){
                return console.log(couleurs.Red(`  '${cmd.command(string, 1)}' is not valid command or command option`))
            }
         
            if(cmd.command(string, 1)){
                // const User = new Model({collection: 'users'})
                // console.log(User)     
                switch (cmd.command(string, 1)) {
                    case "collection":
                        if(cmd.command(string, 2)){
                            // console.log(`${cmd.command(string, 1)} ${cmd.command(string, 2)}`)
                            const UserModel = new Model({collection: `${cmd.command(string, 2)}`})
                            
                            if(cmd.command(string, 3)){
                                switch (cmd.command(string, 3)) {
                                    case 'create': 
                                        console.log('create')
                                        if(cmd.command(string, 4)){

                                            console.log(cmd.command(string, 4))
                                            // if(typeof cmd.command(string, 4) == 'string'){
                                            //     console.log(JSON.parse(cmd.command(string, 4)))
                                            // }
                                        }else{
                                            console.log('nothing')
                                        }
                                        break;
                                    default:
                                        console.log(`Creating ${cmd.command(string,3)}`)
                                        break
                                }
                            }else{

                            }
                        }else{

                        }
                      break;
                    default:
                        console.log(couleurs.Red(`  '${cmd.command(string, 1)}' is not valid command or command option`))
                      break;
                  }       
            }else{

            }

        })
     }

     
       /**
         * Returns an array of method names that should be automatically invoked by the `autoinvoker` method.
         * Modify this method to specify the method names to be autoinvoked.
         *
         * @returns {Array} - An array of method names.
         */
    
       autoinvoked() {
        return ["init", "common", "invalidCommand", "mainCommand"];
    }
}


module.exports = TCPCLI;

new TCPCLI();