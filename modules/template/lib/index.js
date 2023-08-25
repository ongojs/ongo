/**
 * Exports a function that returns an object containing references to the 'model' and 'schema' modules.
 *
 * @function module.exports
 * @returns {Object} An object containing references to the 'model' and 'schema' modules.
 */
module.exports = () => ({
    /**
     * A reference to the 'model' module.
     * @type {Object}
     */
    model: require('./model'),
  
    /**
     * A reference to the 'schema' module.
     * @type {Object}
     */
    schema: require('./schema'),
  });
  