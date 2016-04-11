.PHONY: test

install:
	npm install

build: install
	npm run build

publish: build
	npm publish

test: install
	npm run test

watch-test: install
	./node_modules/.bin/mocha --compilers js:babel-register  --recursive ./test/ --use_strict --watch

version-up-minor:
	git status -s |wc -l|xargs -n 1 test 0 -eq
	npm run build
	npm version minor
#     npm publish
