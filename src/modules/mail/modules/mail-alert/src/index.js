'use strict'
module.exports = (template = require('./template')) => ({
    mailAlert: (options = {}) => template(options.data)
})