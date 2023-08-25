'use strict'
module.exports = (template = require('./template')) => ({
    mailNewsletter: (options = {}) => template(options.data)
})