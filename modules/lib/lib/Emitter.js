/**
 * Constructor function for an Emitter object.
 * @constructor
 * @property {object} events - An object to store event listeners as key-value pairs.
 */
function Emitter() {
    // Initialize an empty object to store event listeners.
    this.events = {};
  }
  

/**
 * Add an event listener for a specific event type.
 * @param {string} type - The event type to listen for.
 * @param {function} listener - The function to be executed when the event is emitted.
 */
Emitter.prototype.on = function(type, listener) {
    // Create an array to store listeners for the specified event type, if not already present.
    this.events[type] = this.events[type] || [];
  
    // Add the provided listener function to the array of listeners for the specified event type.
    this.events[type].push(listener);
  };
  

/**
 * Emit an event of a specific type and invoke all registered event listeners for that type.
 * @param {string} type - The event type to be emitted.
 * @param {...any} args - Optional arguments to be passed to the event listeners.
 */
Emitter.prototype.emit = function(type, ...args) {
  // Check if there are any event listeners registered for the specified event type.
  if (this.events[type]) {
    // If there are listeners, iterate over the array of listeners and invoke each one with the provided arguments.
    this.events[type].forEach(listener => listener(...args));
  }
};


