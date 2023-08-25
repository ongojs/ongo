require('../../dotenv').config()
module.exports = (option = {}) => `'use strict';
/*
|--------------------------------------------------------------------------------
| ${option.model} Model
|--------------------------------------------------------------------------------
|
| ${option.model} extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/

const Model = require('@mongodb-model/model');

class ${option.model} extends Model{

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
    constructor(dbOptions = {collection: '${option.collection}', url: '${process.env.DATABASE_URL}', db: '${process.env.DATABASE_NAME}'},...options){
   
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

    if(!this['hasOwnProperty']['collection']) this.collection = '${option.collection}';
    if(!this['hasOwnProperty']['url']) this.url = '${process.env.DATABASE_URL}';
    if(!this['hasOwnProperty']['faker_url']) this.faker_url = '${process.env.JSON_FAKER_URL}';

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
 module.exports = ${option.model};
`

