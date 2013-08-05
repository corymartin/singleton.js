/*!
 * @preserve
 * singleton.js
 * Creates a singleton from a function constructor.
 * https://github.com/corymartin/singleton.js
 * Copyright (c) 2013 Cory Martin
 * Distributed under the MIT License
 */
void function() {
  'use strict';

  var root = this;
  var previousSingleton = root.singleton;

  var hasOwn = Object.prototype.hasOwnProperty;

  var noop = function(){};

  /**
   * @param {Function} Ctor function constructor
   * @returns {Object}
   */
  var singleton = function(Ctor) {
    var self;

    Ctor = Ctor || noop;

    function Singleton() {
      if (self) return self;
      self = this instanceof Ctor
        ? this
        : Object.create(Singleton.prototype);
      Ctor.apply(self, arguments);
      return self;
    }

    Singleton.prototype = Object.create(Ctor.prototype);

    // Copy own properties
    for (var prop in Ctor) {
      if (hasOwn.call(Ctor, prop)) {
        Singleton[prop] = Ctor[prop];
      }
    }

    return Singleton;
  };


  singleton.VERSION = '0.2.0';


  /**
   * @returns {Function}
   * @api public
   */
  singleton.noConflict = function() {
    root.singleton = previousSingleton;
    return singleton;
  };



  /*
   * Export
   */
  // CommonJS/Node
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = singleton;
  }
  // AMD/Require.js
  else if (typeof define === 'function' && define.amd) {
    define(function() {
      return singleton;
    });
  }
  // Browser
  else {
    root.singleton = singleton;
  }

}.call(this);

