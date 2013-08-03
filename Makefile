
build: clean compile

clean:
	@@rm -f dist/singleton.min.js

compile:
	@@cp lib/singleton.js dist/singleton.js
	@@./node_modules/uglify-js/bin/uglifyjs --comments --output dist/singleton.min.js dist/singleton.js

