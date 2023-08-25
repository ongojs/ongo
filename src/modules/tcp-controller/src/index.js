"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module HTTPController
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc HTTPController class
 */

const {createWriteStream, promises, existsSync} = require('fs');
const {join} = require('path');
const {Readable} = require('stream')
class HTTPController extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(HTTPController);
    // auto invoke methods
    this.autoinvoker(HTTPController);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  ctrlpath( path = '', base = './app/controllers/tcp') {
    return join(base, path)
  }
  ctrlpathname(command){
    return `${this.ctrlpath(command)}.js`;
  }
  ctrlexists(command) {
    return existsSync(`${this.ctrlpath(command)}.js`) ? true : false;
  }
  writeable(command, options = {encoding: 'utf-8'}){
    return createWriteStream(this.ctrlpathname(command), options);
  }
  readable(data, options = {encoding: 'utf-8'}){
    return Readable.from(data, options)
  }
  makeController(command, data = {}){
    
    return this.readable(data).pipe(this.writeable(command));
  }
  ctrldirpath(command){
    const path = command.split('/')
    path.pop();
    return this.ctrlpath(path.join('/'))
  }
  async makedir(command){
    if(this.direxists(command)){
        if(this.ctrlexists(command)){
            console.log(command.split('/').pop(), 'Controller Already Exits')
        }else{
            try{
              await promises.mkdir(this.ctrldirpath(command), {recursive: true})
            }catch(error){
                console.log('error', error)
            }
        }
        
     }else{
        try{
           await promises.mkdir(this.ctrldirpath(command), {recursive: true})
        }catch(error){
            console.log('error', error)
        }
     }
  }
  direxists(command){
    return existsSync(`${this.ctrldirpath(command)}`) ? true : false;
  }
  async create(command, data = {}){

     if(this.direxists(command)){
        if(this.ctrlexists(command)){
            console.log(command.split('/').pop(), 'Controller Already Exits')
        }else{
            await this.makedir(command);
            this.makeController(command, data);
            this.emit('makeController', command)
            return console.log(command.split('/').pop(), 'Controller has been created');
        }
     }else{

        await this.makedir(command);
        this.makeController(command, data);
        this.emit('makeController', command)
        return console.log(command.split('/').pop(), 'Controller has been created');
     }

  }
  tplOptions(command, path = ``){
     for(let i = 0; i < command.split('/').length; i++){
        path += `../`
     }
     path += 'Controller';
     const name = command.split('/').pop();
     const filepath = './templates'
     return {name, path, filepath};
    
  }
 fromTemplate(command, options = this.tplOptions(command)){
   return require(options.filepath)(options);
 }
  home(){return process.cwd()}

  async make(command){
     await this.create(command, this.fromTemplate(command))
     this.emit('make', command);
  }

}

module.exports = HTTPController;
