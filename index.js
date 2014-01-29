var uid = require('uid');

function noop() {
  // do nothing
}

/**
 * Creates a new Symbol object
 */

function Symbol() {
  // allow usage without `new`
  if (!(this instanceof Symbol)) return new Symbol();

  // create a unique key based on a long uid for this symbol
  var __key__ = this.__key__ = "__symbol__" + uid(32);

  // define a property on Object.prototype, so that whenever a property 
  // with the key we just generated is set on any object, it's automatically
  // marked as non-enumerable. this is technically global, but shouldn't matter
  // since it's unique and non-enumerable
  Object.defineProperty(Object.prototype, __key__, {
    enumerable: false,
    configurable: false,
    get: function() {},
    set: function(value) {
      // Store the received value and mark it as non-enumerable
      Object.defineProperty(this, __key__, {
        enumerable: false,
        configurable: true,
        writeable: true,
        value: value
      });
    }
  })
}

/**
 * Returns the internal string representation of the Symbol object
 */

Symbol.prototype.toString = function() {
  return this.__key__;
}

module.exports = Symbol;