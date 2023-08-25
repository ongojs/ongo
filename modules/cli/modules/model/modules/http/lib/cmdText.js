'use strict'; 
const cmd = require('../../../../cmd')();
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
    


        const commands = () =>  ({
            '\x1b[36mman\x1b[0m': '                  model man page: [\x1b[36mman\x1b[0m] ',
            '\x1b[36m--help\x1b[0m or \x1b[36m-h\x1b[0m': '         Help: [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m\x1b[0m\x1b[0m]',
            '\x1b[36mmake:model\x1b[0m': '           Make model: [\x1b[36mmake:model\x1b[0m\x1b[0m\x1b[0m] model_name',
            '\x1b[36mmake:migration\x1b[0m': '       Make migration: [\x1b[36mmake:migration\x1b[0m\x1b[0m] migration_name',
            '\x1b[36mmake:schema\x1b[0m': '          Make schema: [\x1b[36mmake:schema\x1b[0m\x1b[0m\x1b[0m] schema_name',
            '\x1b[36mmigrate\x1b[0m ': '             Migrate: [\x1b[36m--schema=\x1b[0m|\x1b[36m-s\x1b[0m]schema_name'
        })
        const centered =  () => `\x1b[36mNAME\x1b[0m
            \x1b[36mHTTP\x1b[0m - HTTP and an HTTP's methods details 
            
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
         const manPage = () => {
              //this.horizontalLine()
              cmd.centered(`\x1b[32mHTTP COMMANDS AND USAGE MANUAL\x1b[0m`)
              //this.horizontalLine()
              cmd.description(centered())
              //this.horizontalLine()
              cmd.verticalSpace(2)
  
              const options = { pad: 13, position: process.stdout.columns, hline: false, keyColor: '36', valueColor: '37' }
              cmd.textAligner(options, commands())
              console.log()
         }
        const tcpCmdText = () => ({
            manPage
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
    | the tcpCmdText object by assigning it to module.exports
    |
    |
    */
    
    if (typeof module !== 'undefined' && module.exports)  module.exports = tcpCmdText;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.tcpCmdText.
    |
    */

    else global.tcpCmdText = tcpCmdText;
})(this)