var singleton = require('./lib/singleton');
singleton.VERSION = require('./package.json').version;

module.exports = singleton;

