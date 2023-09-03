#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Module
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Module class
 */

 const formData = require('form-data');
 const Mailgun = require('mailgun.js');
 const mailgun = new Mailgun(formData);

 require('dotenv').config()
class Mail extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });
    if(!this.client) this.client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
    if(!this.DOMAIN) this.DOMAIN = process.env.MAILGUN_DOMAIN;
   
    // auto bind methods
    this.autobind(Mail);
    // auto invoke methods
    this.autoinvoker(Mail);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

    autoinvoked() {
      return [];
    }

 

}

module.exports = Mail;