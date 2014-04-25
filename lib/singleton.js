/*!
 * @preserve
 * {{NAME}}
 * {{DESCRIPTION}}
 * {{HOMEPAGE}}
 * Copyright (c) 2013 Cory Martin
 * Distributed under the MIT License
 */
void function() { 'use strict'

  var root = this;
  var previousSingleton = root.singleton;

  var noop = function(){};

  function merge(target, source) {
    Object.getOwnPropertyNames(source).forEach(function(prop) {
      if (prop in target) return;
      var desc = Object.getOwnPropertyDescriptor(source, prop);
      Object.defineProperty(target, prop, desc);
    });
  }

  /**
   * @param {Function} Ctor function constructor. Optional.
   * @returns {Function}
   * @api public
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

    // Copy static properties
    merge(Singleton, Ctor);

    return Singleton;
  };


  singleton.VERSION = '{{VERSION}}';


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

