install:
	npm install

build:
	./node_modules/.bin/browserify ./main.es6 -o ./main.js -t [ babelify --presets es2015 ]
