"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module TCPRouteMaker
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc TCPRouteMaker class
 */

const {
  createWriteStream,
  createReadStream,
  promises,
  existsSync,
} = require("fs");
const { join } = require("path");
const { Readable } = require("stream");
const { readdirRecursive } = require("./lib");

const TCPController = require("../tcp-controller");

const {Green, Red} = require('../couleurs')();

const tcpController = new TCPController();

class TCPRouteMaker extends require("../base") {
  constructor(...arrayOfObjects) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach((option) => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          if (!this[key]) this[key] = option[key];
        });
      }
    });

    // auto bind methods
    this.autobind(TCPRouteMaker);
    // auto invoke methods
    this.autoinvoker(TCPRouteMaker);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  routerpath(path = "", base = "./sockets") {
    return join(base, path);
  }
  routercontrollerpath(path = "", base = "./app/controllers/tcp") {
    return join(base, path);
  }
  routerpathname(command) {
    return `${this.routerpath(command)}.js`;
  }
  routerexists(command) {
    return existsSync(`${this.routerpath(command)}.js`) ? true : false;
  }
  routercontrollerexists(command) {
    return existsSync(`${this.routercontrollerpath(command)}.js`)
      ? true
      : false;
  }
  writeable(command, options = { encoding: "utf-8" }) {
    return createWriteStream(this.routerpathname(command), options);
  }
  readable(data, options = { encoding: "utf-8" }) {
    return Readable.from(data, options);
  }
  makeController(command, data = {}) {
    return this.readable(data).pipe(this.writeable(command));
  }
  makeRouteIndex(data = {}) {
    return this.readable(data).pipe(this.writeable("index"));
  }
  routerdirpath(command) {
    const path = command.split("/");
    path.pop();
    return this.routerpath(path.join("/"));
  }
  async makedir(command) {
    if (this.direxists(command)) {
      if (this.routerexists(command)) {
        console.log(Red(command.split("/").pop()), Red("Route Already Exits"));
      } else {
        try {
          await promises.mkdir(this.routerdirpath(command), {
            recursive: true,
          });
        } catch (error) {
          console.log("error", error);
        }
      }
    } else {
      try {
        await promises.mkdir(this.routerdirpath(command), { recursive: true });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  direxists(command) {
    return existsSync(`${this.routerdirpath(command)}`) ? true : false;
  }
  async create(command, data = {}) {
    //  if(command.startsWith('--controller=')){
    //   command = command.split('--controller=')[1];
    //  }
    // //  return console.log('create', command)
    if (this.direxists(command)) {
      if (this.routerexists(command)) {
        console.log(Red(command.split("/").pop()), Red("Route Already Exits"));
      } else {
        await this.makedir(command);
        this.makeController(command, data);
        return console.log(Green(command.split("/").pop()), Green("Route has been created"));
      }
    } else {
      await this.makedir(command);
      this.makeController(command, data);
      return console.log(Green(command.split("/").pop()), Green("Route has been created"));
    }
  }
  tplOptions(command, path = ``) {
    for (let i = 0; i < command.split("/").length; i++) {
      path += `../`;
    }
    path += "../src/Router";
    const name = command.split("/").pop();
    const filepath = "./src/templates/app";

    let endpoint = command.split("/").pop();
    if (endpoint.split("Router").length < 2) {
      endpoint = endpoint.split("Route")[0].toLowerCase();
    } else if (endpoint.split("Route").length < 2) {
      endpoint = endpoint.split("Router")[0].toLowerCase();
    } else {
      endpoint = endpoint.split("Router")[0].toLowerCase();
    }
    //  endpoint = endpoint.split('Router')[0].toLowerCase();
    if (!endpoint.endsWith("s")) endpoint = endpoint + "s";
    return { name, path, filepath, endpoint, namespace: `${name}Namespace`, onConnection: `${name}OnConnection`};
  }

  withTplOptions(routerCommand, controllerCommand, path = ``) {
    let depth = ``;
    for (let i = 0; i < routerCommand.split("/").length; i++) {
      path += `../`;
      depth += `../`;
    }
    path += "../src/Router";
    const name = routerCommand.split("/").pop();
    const filepath = "./src/templates/appWithController";

    let endpoint = routerCommand.split("/").pop();
    if (endpoint.split("Router").length < 2) {
      endpoint = endpoint.split("Route")[0].toLowerCase();
    } else if (endpoint.split("Route").length < 2) {
      endpoint = endpoint.split("Router")[0].toLowerCase();
    } else {
      endpoint = endpoint.split("Router")[0].toLowerCase();
    }
    //  endpoint = endpoint.split('Router')[0].toLowerCase();
    if (!endpoint.endsWith("s")) endpoint = endpoint + "s";

    const router = {};
    router.name = name;
    router.namespace = `${name.split('Router')[0]}Namespace`
    router.onConnection = `${name.split('Router')[0]}OnConnection` 
    router.path = path;
    router.endpoint = endpoint;

    const controller = {};
    controller.name = controllerCommand
      .split("--controller=")[1]
      .split("/")
      .pop();
    controller.path = controllerCommand.split("--controller=")[1];
    controller.depth = depth;

    let details;
    if (controllerCommand) {
      this.on("checkFormRouterController", (result) => {
        const resultData = {
          router,
          filepath,
          controller,
          result,
        };

        this.emit("withTplOptions", resultData);
      });
      this.withCommand(controllerCommand);
    }
    const routeObject = { router, filepath, controller, details}
    return routeObject;
  }

  fromTemplate(command, options = this.tplOptions(command)) {
    return require(options.filepath)(options);
  }
  //   async withFromTemplate(routerCommand, controllerCommand, options = this.withTplOptions(routerCommand, controllerCommand)){
  //      const result = await options;
  //      if(result){
  //        return console.log(result);
  //      }else{
  //       return console.log('nothing');
  //      }
  //   // return require(options.filepath)(options);
  // }
  withFromTemplate(options = {}) {
    return require(options.filepath)(options);
  }
  home() {
    return process.cwd();
  }

  importRoutes(options) {
    for (let route of options.routes) {
      console.log(route);
    }
  }
  async readdirRecursive(path) {
    const routes = {};
    try {
      const files = await promises.readdir(this.routerpath());
      for (const file of files) {
        if (
          (await promises.lstat(this.routerpath(file))).isFile() &&
          file !== "index.js"
        ) {
          routes[this.routerpath(file).split(".js")[0]] = require(`../../../${
            this.routerpath(file).split(".js")[0]
          }`);
        }
        if ((await promises.lstat(this.routerpath(file))).isDirectory()) {
          let dirPath = `../../../${this.routerpath(file).split(".js")[0]}`;
          if (existsSync(`${this.routerpath(file)}`)) {
            console.log("exits");
          } else {
            console.log("no");
          }
          // console.log(require(`../../../${this.routerpath(file).split('.js')[0]}/userRouter`));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log(routes);
    }
  }

  exportRouter() {
    ///from = "../../../routes", to = '../index.js'
    const path = '../../../sockets';
const writeable = createWriteStream('../index.js')

writeable.write(`'use strict';
/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!
|
*/\n`)

readdirRecursive(path)
.then(files => {
    
    const routerObject = {}
   for(let file of files){
    // if(!file.includes('index.js')){
    //     if(file.split('/').pop().split('.js').join('') !== 'index'){
    //       writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("${file}"); \n`)
    //     }
        
    // }

    if(file.split('/').pop().split('.js').join('') !== 'index') {
      writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("${file}"); \n`)
    }
   }

   writeable.write(`\n`)
   writeable.write(`module.exports = io => {
    `)
    writeable.write(`\n    `)
   for(let file of files){
    // if(!file.includes('index.js')){
    //     writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
    // }
    if(file.split('/').pop().split('.js').join('') !== 'index'){
      writeable.write(`${file.split('/').pop().split('.js').join('')}(io);        \n    `)
    }
   }

   writeable.write(`\n`)
   writeable.write(`}`)

//    console.log(routerObject)
})
.catch(error => {
    console.log(error)
})
     
  }

  createRoutesIndex() {
    readdirRecursive('./sockets').then(files => {
      const writeable = createWriteStream('./src/http-routes/index.js');
      writeable.write(`'use strict';
/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!
|
*/\n`)
      for(let file of files){
        // if(!file.includes('index.js')){

        //     writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("../../${file.split('.js').join('')}"); \n`)
        // }

        if(file.split('/').pop().split('.js').join('') !== 'index'){
          writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("../../${file.split('.js').join('')}"); \n`)
        }
       }


       writeable.write(`\n`)
       writeable.write(`module.exports = io => {
        `)
        writeable.write(`\n    `)
       for(let file of files){
        if(file.split('/').pop().split('.js').join('') !== 'index'){
          writeable.write(file);
          // writeable.write(`${file.split('/').pop().split('.js').join('')}(io);        \n    `)
        }
        // writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
       }
    
       writeable.write(`\n`)
       writeable.write(`}`)
    })
    .catch(error => {
      console.log(error)
    })
  }


  routesIndex() {
    readdirRecursive('./sockets').then(files => {
      const writeable = createWriteStream('./sockets/index.js');
      writeable.write(`'use strict';

const sio_redis = require("socket.io-redis");
const Socket = require("socket");

/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!

|
*/\n`)
      // for(let file of files){
      //   // if(!file.includes('index.js')){
      //   //     writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("../../${file.split('.js').join('')}"); \n`)
      //   // }
      //   // if(file.split('/').pop().split('.js').join('') !== 'index'){
      //   //   writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require(".${file.split('.js').join('').split('routes')[1]}"); \n`)
      //   // }
      //  }


       writeable.write(`\n`)
       writeable.write(`module.exports = server => {
        `)
        writeable.write(`\n    `)
        writeable.write(` // build io \n`)
        writeable.write(`    const io = new Socket(server).adapter(sio_redis({ host: "localhost", port: 6379 }))`)
        writeable.write(`\n    `)
        writeable.write(`\n    `)
       for(let file of files){
        // writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
        if(file.split('/').pop().split('.js').join('') !== 'index'){
          // writeable.write(`require(".${file.split('.js').join('')}")(io);        \n    `)
          writeable.write(`require(".${file.split('.js').join('').split('sockets')[1]}")(io);        \n    `)
        }
       }
    
       writeable.write(`\n`)
       writeable.write(`}`)
    })
    .catch(error => {
      console.log(error)
    })
  }
  async make(command, controllerCommand) {
    await this.create(command, this.fromTemplate(command));
    setTimeout(() => {
      this.routesIndex();
    },500)
    if(controllerCommand && controllerCommand !== undefined){
      this.on("withTplOptions", (resultData) => {
        const module = resultData.result.initRouteFunction(
          resultData.result.controllerMethods,
          resultData
        );
        resultData.module = module;
        this.create(command, this.withFromTemplate(resultData));
        setTimeout(() => {
          this.routesIndex();
        },500)
      });
      await this.withTplOptions(command, controllerCommand);
    }
    }

  controllerMethods() {
    return ["index", "store", "show", "edit", "update", "destroy"];
  }

  async routerControllerExists(controllerCommand) {
    this.emit("hello", "hello controller");
    if (controllerCommand.startsWith("--controller=")) {
      const controller = controllerCommand.split("=")[1];
      if (!tcpController.ctrlexists(controller)) {
        tcpController.make(controller);
      }
    } else {
      return console.log("invalid router command");
    }
  }

  initRouteFunction(
    methods = {},
    options = {},
    module = `
`
  ) {
    for (let method in methods) {
      if (method === "index") {
        // console.log(`${options.router.name}.get("/${options.router.endpoint}", ${method});`)
        // module += `    app.get("/${options.router.endpoint}", ${method});\n`;
        module += `    ${method}(io, socket, sub, pub)\n`;
      }
      if (method === "store") {
        // console.log(`app.post("/${options.router.endpoint}", ${method});`)
        module += `    ${method}(io, socket, sub, pub)\n`;
      }
      if (method === "show") {
        // console.log(`app.get("/${options.router.endpoint}/:id", ${method});`)
        module += `    ${method}(io, socket, sub, pub)\n`;
      }
      if (method === "update") {
        // console.log(`app.post("/${options.router.endpoint}/:id", ${method});`)
        module += `    ${method}(io, socket, sub, pub)\n`;
      }
      if (method === "edit") {
        // console.log(`app.put("/${options.router.endpoint}/:id", ${method});`)
        module += `    ${method}(io, socket, sub, pub)\n`;
      }
      if (method === "destroy") {
        // console.log(`app.delete("/${options.router.endpoint}/:id", ${method});`)
        module += `    ${method}(io, socket, sub, pub)\n`;
      }
    }

    return module;
  }
  checkFormRouterController(controller) {
    // const Controller = require(`../../../../../app/controllers/tcp/${controller}`);
    const Controller = require(join(process.cwd(),`/app/controllers/tcp/${controller}`));
    // const Controller = require(`../../../../../`);
    let methods = ``;
    const controllerMethods = {};
    for (let method in new Controller()) {
      if (this.controllerMethods().includes(method)) {
        methods += method + " ";
        controllerMethods[method] = new Controller()[method];
      }
    }
    const result = {
      ctrl: controller,
      controllerMethods,
      methods: methods.trim().split(" ").join(","),
      initRouteFunction: this.initRouteFunction,
    };

    this.emit("checkFormRouterController", result);
  }
  withCommand(controllerCommand) {
    if (controllerCommand.startsWith("--controller=")) {
      const controller = controllerCommand.split("=")[1];

      tcpController.make(controller);
      setTimeout(() => {
        if (existsSync(`./app/controllers/tcp/${controller}.js`)) {
          return this.checkFormRouterController(controller);
        } else {
          console.log(
            `./app/controllers/tcp/${controller}.js does not exists`
          );
        }
      }, 500);

    } else {
      return console.log("invalid command");
    }
  }


  async makeWith(routerCommand, controllerCommand) {
    this.on("withTplOptions", (resultData) => {
      const module = resultData.result.initRouteFunction(
        resultData.result.controllerMethods,
        resultData
      );
   
      resultData.module = module;
      this.create(routerCommand, this.withFromTemplate(resultData));
      setTimeout(() => {
        this.routesIndex();
      },500)
    });
    this.withTplOptions(routerCommand, controllerCommand);
  }
}

module.exports = TCPRouteMaker;
