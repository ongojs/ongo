module.exports  = (options = {}) => `"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module ${options.name}
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc ${options.name} class
 */

 require('dotenv').config()
const { createReadStream } = require("fs");
const mail = require("${options.module}");

class ${options.name} extends require("@afrosintech/mailgun-mail") {
  constructor(...arrayOfObjects) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach((option) => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          if (!this[key]) this[key] = option[key];
        });
      }
    });
    if (!this.from) this.from = process.env.MAIL_FROM;
    if (!this.to) this.to = process.env.MAIL_TO;
    if (!this.mail) this.mail = {
      signature: process.env.APP_NAME,
      twitterUsername: 'express-ongo',
      twitterLink:'https://www.twitter.com'
    }

    // auto bind methods
    this.autobind(${options.name});
    // auto invoke methods
    this.autoinvoker(${options.name});
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);

    // add other objects' methods if methods do not already exist. Argument order matters!
    // this.methodizeProperty(require('./lib')())
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
   * @name render
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

  mailData() {
    return {
      from: this.from || null,
      to: this.to || null,
      subject: this.subject || null,
      text: this.message || null,
      html: mail(this.mail),
      attachment: this.attachment || null,
      cc: this.cc || null,
      bcc: this.bcc || null,
      filenames: this.filenames || []
    };
  }
  async build(html = {}, mail = this.mail) {
    try {
      this.mail.body = html;
      const result = await this.client.messages.create(
        this.DOMAIN,
        this.mailData()
      );

      this.emit("email", result);
      return result;
    } catch (error) {
      this.emit("email-error", error);
      return error;
    } finally {
      return this;
    }
  }
  email(data = this.data, html =  '') {
    const readable = createReadStream("../resources/mail/${options.filename}", {
      encoding: "utf-8"
    });

    readable.on("data", (chunk) => {
      const replace = "(?<={{).*?(?=}})";
      const re = new RegExp(replace, "g");
      if (data) {
        html = chunk
          .toString()
          .replace(re, (string) => data[string])
          .replace(/[{}]/g, "");
      }
    });
    readable.on("error", (error) => console.log(error));
    readable.on("end", async () => this.build(html));
  }
}

module.exports = ${options.name};
`