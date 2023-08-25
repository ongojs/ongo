'use strict'
module.exports = (template = require('./template')) => ({
    mailPassword: (options = {}) => template(options.data)
})