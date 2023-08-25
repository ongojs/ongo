"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module HTTPRoute
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc HTTPRoute class
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

const {Green, Red} = require('../couleurs')()

const HTTPController = require("../http-controller");

const httpController = new HTTPController();

class HTTPRoute extends require("../base") {
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
    this.autobind(HTTPRoute);
    // auto invoke methods
    this.autoinvoker(HTTPRoute);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  routerpath(path = "", base = "./routes") {
    return join(base, path);
  }
  routercontrollerpath(path = "", base = "./app/controllers/http") {
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
        console.log(Red(command.split("/").pop()), Red("Router Already Exits"));
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
        return console.log(Green(command.split("/").pop()), Green("Route Created"));
      }
    } else {
      await this.makedir(command);
      this.makeController(command, data);
      return console.log(Green(command.split("/").pop()), Green("Route Created"));
    }
  }
  tplOptions(command, path = ``) {
    for (let i = 0; i < command.split("/").length; i++) {
      path += `../`;
    }
    path += "../src/Router";
    const name = command.split("/").pop();
    const filepath = "./src/templates/route";

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
    return { name, path, filepath, endpoint };
  }

  async withTplOptions(routerCommand, controllerCommand, path = ``) {
    let depth = ``;
    for (let i = 0; i < routerCommand.split("/").length; i++) {
      path += `../`;
      depth += `../`;
    }
    path += "../src/Router";
    const name = routerCommand.split("/").pop();
    const filepath = "./src/templates/withcontroller";

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
      await this.withCommand(controllerCommand);
    }
    return { router, filepath, controller, details };
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
    const path = '../../../routes';
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
   writeable.write(`module.exports = app => {
    `)
    writeable.write(`\n    `)
   for(let file of files){
    // if(!file.includes('index.js')){
    //     writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
    // }
    if(file.split('/').pop().split('.js').join('') !== 'index'){
      writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
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
    readdirRecursive('./routes').then(files => {
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
       writeable.write(`module.exports = app => {
        `)
        writeable.write(`\n    `)
       for(let file of files){
        if(file.split('/').pop().split('.js').join('') !== 'index'){
          writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
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
    readdirRecursive('./routes').then(files => {
      const writeable = createWriteStream('./routes/index.js');
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
      // for(let file of files){
      //   // if(!file.includes('index.js')){
      //   //     writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require("../../${file.split('.js').join('')}"); \n`)
      //   // }
      //   // if(file.split('/').pop().split('.js').join('') !== 'index'){
      //   //   writeable.write(`const ${file.split('/').pop().split('.js').join('')}  = require(".${file.split('.js').join('').split('routes')[1]}"); \n`)
      //   // }
      //  }


       writeable.write(`\n`)
       writeable.write(`module.exports = app => {
        `)
        writeable.write(`\n    `)
       for(let file of files){
        // writeable.write(`${file.split('/').pop().split('.js').join('')}(app);        \n    `)
        if(file.split('/').pop().split('.js').join('') !== 'index'){
          writeable.write(`require(".${file.split('.js').join('').split('routes')[1]}")(app);        \n    `)
        }
       }
    
       writeable.write(`\n`)
       writeable.write(`}`)
    })
    .catch(error => {
      console.log(error)
    })
  }
  async make(command) {
    await this.create(command, this.fromTemplate(command));
    setTimeout(() => {
      this.routesIndex();
    },500)
  }
  controllerMethods() {
    return ["index", "store", "show", "edit", "update", "destroy"];
  }

  async routerControllerExists(controllerCommand) {
    this.emit("hello", "hello controller");
    if (controllerCommand.startsWith("--controller=")) {
      const controller = controllerCommand.split("=")[1];
      if (!httpController.ctrlexists(controller)) {
        httpController.make(controller);
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
        module += `    app.get("/${options.router.endpoint}", ${method});\n`;
      }
      if (method === "store") {
        // console.log(`app.post("/${options.router.endpoint}", ${method});`)
        module += `    app.post("/${options.router.endpoint}", ${method});\n`;
      }
      if (method === "show") {
        // console.log(`app.get("/${options.router.endpoint}/:id", ${method});`)
        module += `    app.get("/${options.router.endpoint}/:id", ${method});\n`;
      }
      if (method === "update") {
        // console.log(`app.post("/${options.router.endpoint}/:id", ${method});`)
        module += `    app.post("/${options.router.endpoint}/:id", ${method});\n`;
      }
      if (method === "edit") {
        // console.log(`app.put("/${options.router.endpoint}/:id", ${method});`)
        module += `    app.put("/${options.router.endpoint}/:id", ${method});\n`;
      }
      if (method === "destroy") {
        // console.log(`app.delete("/${options.router.endpoint}/:id", ${method});`)
        module += `    app.delete("/${options.router.endpoint}/:id", ${method});\n`;
      }
    }

    return module;
  }
  checkFormRouterController(controller) {
    // const Controller = require(`../../../../../app/controllers/http/${controller}`);
    const Controller = require(join(process.cwd(), `/app/controllers/http/${controller}`));
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
  async withCommand(controllerCommand) {
    if (controllerCommand.startsWith("--controller=")) {
      const controller = controllerCommand.split("=")[1];

      await httpController.make(controller);
      setTimeout(() => {
        if (existsSync(`./app/controllers/http/${controller}.js`)) {
          return this.checkFormRouterController(controller);
        } else {
          console.log(
            `./app/controllers/http/${controller}.js does not exists`
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
    await this.withTplOptions(routerCommand, controllerCommand);
  }
}

module.exports = HTTPRoute;
