.PHONY: test

install:
	npm install

build:
	./node_modules/.bin/babel src --out-dir lib --source-maps-inline --presets es2015

publish: build
	npm publish

test:
	./node_modules/.bin/mocha --compilers js:babel-register  --recursive ./test/ --use_strict

watch-test:
	./node_modules/.bin/mocha --compilers js:babel-register  --recursive ./test/ --use_strict --watch

