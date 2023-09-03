'use strict';
/*
|--------------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------------
|
| User extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/

const Model = require('../src/modules/model');

class User extends Model{

    /*
    |----------------------------------------------------------------------------------
    |                                   constructor
    |----------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    | options: default model options: any other option  for the model.
    |
    |
    */
    constructor(dbOptions = {collection: 'users', url: 'mongodb://localhost:27017/model', db: 'model'},...options){
   
    /*
    |-------------------------------------------------------------------------------------
    |                                       super
    |-------------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    |
    |
    */

    super(dbOptions);

    /*
    |--------------------------------------------------------------------------------------
    | default database options: in case dbOptions is set but collection and url 
    | keys on the dbOptions are not provided.
    |--------------------------------------------------------------------------------------
    |
    */

    if(!this['hasOwnProperty']['collection']) this.collection = 'users';
    if(!this['hasOwnProperty']['url']) this.url = 'mongodb://localhost:27017/model';
    if(!this['hasOwnProperty']['faker_url']) this.faker_url = 'https://jsonplaceholder.typicode.com/';

    /*
    |---------------------------------------------------------------------------------------
    |                                      model options
    |---------------------------------------------------------------------------------------
    | Any other optional options passed to the model.
    |
    */
        options.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach(key => {
                    if(!this[key]) this[key] = option[key];
                })
            }
        })
    }

    /*
    |---------------------------------------------------------------------------------------
    |                   Bellow, you may add properties and methods to your model. 
    |---------------------------------------------------------------------------------------
    |
    */


    /**
     * @name sayHello
     * @function
     *
     * @param {Object|String} toMyProject Project name or project object.
     *
     * @description says hello to my project
     *
     * @return does not return anything
     *
     */

    async sayHello(toMyProject) {
        console.log('Hello there', toMyProject, '! I understand you are the new wonderful chick in the neighborhood!');
    }

 }


 /*
 |-----------------------------------------------------------------------------------------------
 |                                       exports model 
 |-----------------------------------------------------------------------------------------------
 |
 */
 module.exports = User;
