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
  open: function() { /****/ },
  close: function() { /****/ }
};
new Modal() === new Modal() // => true
```

```js
function Modal(priority){
  this.priority = priority;
}

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
var Printer = singleton(function(id, config) {
  this.id = id;
});
Printer.prototype = {
  print: function() { /****/ },
  queue: []
};
new Printer('Office Printer');
new Printer().id        // => 'Office Printer'
new Printer('Chuck').id // => 'Office Printer'
```

Example with Backbone.js Collections

```js
var Movie = Backbone.Model.extend();

var Movies = singleton(Backbone.Collection.extend({
  model: Movie
}));

new Movies() === new Movies() // => true

new Movies().add([
  {id: 100, title: 'Gattica'},
  {id: 101, title: 'Batman Begins'}
]);

new Movies().length // => 2

var BMovies = Movies.extend();
BMovies instanceof Movies              // => true
BMovies instanceof Backbone.Collection // => true
```
