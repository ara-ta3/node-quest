install:
	npm install

build:
	./node_modules/.bin/babel src --out-dir lib --source-maps-inline

