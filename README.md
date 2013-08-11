Singleton.js
============

Creates a singleton from a function constructor.


Installation
------------

```bash
$ npm install singleton.js
```

```js
var singleton = require('singleton.js');
```

Browser
-------

Requires `Object.create()`. If targeting older, unsupported
browsers (<= IE8) you'll need a
[polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill).

[singleton.js](https://rawgithub.com/corymartin/singleton.js/master/dist/singleton.js)

[singleton.min.js](https://rawgithub.com/corymartin/singleton.js/master/dist/singleton.min.js)

API
---

### singleton(Ctor)

__arguments__

- `Ctor` Optional. Function constructor.

__returns__

- Singleton function constructor.
    - Returns initial instance for all subsequent instantiations.
    - `new` is optional.
    - Inherits from passed function constructor.
    - Will have own properties of passed function constructor.

```js
var Modal = singleton();
Modal.prototype = {
  open:  function() { /****/ },
  close: function() { /****/ }
};
new Modal() === new Modal()  // => true
new Modal() instanceof Modal // => true
```

```js
function Modal(priority){
  this.priority = priority;
}
Modal.prototype.open  = function() { /****/ };
Modal.prototype.close = function() { /****/ };

// Create a singleton from an existing function constructor
var Alert = singleton(Modal);
new Alert(10);
new Alert() === new Alert()  // => true
// `new` is optional
Alert() === new Alert()      // => true
new Alert() instanceof Alert // => true
new Alert() instanceof Modal // => true
new Alert().priority         // => 10
new Alert(3).priority        // => 10
```

```js
// Define singleton's constructor
var Printer = singleton(function(name) {
  this.name  = name;
  this.queue = [];
});
Printer.prototype.print = function() { /****/ };

new Printer('Office Printer');
new Printer().name        // => 'Office Printer'
new Printer('Chuck').name // => 'Office Printer'
```

Example with Backbone.js Collections

```js
var Movie = Backbone.Model.extend();

var Movies = singleton(Backbone.Collection.extend({
  model: Movie
}));

// Alternatively
// var Movies = singleton(Backbone.Collection);
// Movies.prototype.model = Movie;

new Movies() === new Movies() // => true

new Movies().add([
  {id: 100, title: 'Gattica'},
  {id: 101, title: 'Batman Begins'}
]);

new Movies().length // => 2

// Static/Own properties are maintained
var BMovies = Movies.extend();
new BMovies() instanceof Movies              // => true
new BMovies() instanceof Backbone.Collection // => true
```

