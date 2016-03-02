install:
	npm install

build:
	./node_modules/.bin/babel src/ --out-dir ./dist --presets es2015
