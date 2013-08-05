var singleton = require('../index');
var expect    = require('chai').expect;
var Backbone  = require('backbone');


var Modal;
var Model;
var Collection;

beforeEach(function() {
  Modal = function Modal(name) {
    this.name = name;
  }
  var isOpen = false;
  Modal.prototype = {
    open: function() {
      isOpen = true;
    },
    close: function() {
      isOpen = false;
    },
    isOpen: function() {
      return isOpen;
    }
  };

  Model = Backbone.Model.extend();
  Collection = singleton(Backbone.Collection.extend({
    model: Model
  }));
});


describe('singleton()', function() {
  it('should return a new, singleton function constructor', function() {
    var S = singleton(Modal);
    expect(new S).to.equal(new S);

    var S2 = singleton(function Foo() {});
    expect(new S2).to.equal(new S2);
  });

  it('should work without a passed function constructor', function() {
    var S = singleton();
    expect(new S).to.equal(new S);
  });

  it('should work with unnamed function constructors', function() {
    var S = singleton(function(name) {
      this.name = name;
    });
    expect(new S('Jimbo')).to.equal(new S);
    expect(new S('Xander').name).to.equal('Jimbo');
  });
});


describe('Returned singleton function constructor', function() {
  it('should return the original instance everytime', function() {
    var S = singleton(Modal);
    new S('Mr.Modal');
    expect(new S().name).to.equal('Mr.Modal');
    new S().close();
    expect(new S().isOpen()).to.equal(false);
    new S().open();
    expect(new S().isOpen()).to.equal(true);
    new S().close();
    expect(new S().isOpen()).to.equal(false);
  });

  it('should create an instance with or without the `new` operator', function() {
    var S = singleton(Modal);
    expect(S()).to.be.an.instanceOf(S);
    expect(new S).to.be.an.instanceOf(S);
    expect(S()).to.equal(new S);
  });

  it('should be a subclass of the passed class', function() {
    var S = singleton(Modal);
    expect(new S).to.be.an.instanceOf(S);
    expect(new S).to.be.an.instanceOf(Modal);
    expect(new S().__proto__.__proto__).to.equal(Modal.prototype);
  });

  it('should keep all functionality of the passed class', function() {
    var coll = new Collection();
    expect(coll).to.equal(new Collection());
    coll.add([
      {id:100, name:'Jen'},
      {id:200, name:'Bob'}
    ]);
    expect(coll.length).to.equal(2);
    expect(coll.length).to.equal(new Collection().length);

    coll.add([{id:300, name:'Lou'}]);
    expect(new Collection().length).to.equal(3);
    var lou = new Collection().findWhere({name: 'Lou'});
    expect(lou.get('id')).to.equal(300);
  });

  it('should have own properties of the passed class', function() {
    expect(Collection.extend).to.equal(Backbone.Collection.extend);

    var Mod = Backbone.Model.extend();
    var Coll = Collection.extend({
      model: Mod
    });
    expect(Coll.extend).to.equal(Backbone.Collection.extend);
    expect(new Coll()).to.be.instanceOf(Backbone.Collection);
    expect(new Coll()).to.equal(new Coll());
    expect(Coll()).to.equal(new Coll());
  });
});

