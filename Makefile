install:
	npm install

build:
	./node_modules/.bin/babel src --out-dir lib --source-maps-inline --presets es2015

publish: build
	npm publish
