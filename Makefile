.PHONY: test

install:
	npm install

build: install
	npm run build

publish: install build
	npm publish

test: install
	npm run --silent test

test-watch: install
	npm run test-watch

flow:
	npm run --silent flow

watch-test: install
	./node_modules/.bin/mocha --compilers js:babel-register  --recursive ./test/ --use_strict --watch

version-up-minor: 
	git status -s |wc -l|xargs -n 1 test 0 -eq
	git br |grep '* master'
	npm version minor
	$(MAKE) publish

version-up-patch: 
	git status -s |wc -l|xargs -n 1 test 0 -eq
	git br |grep '* master'
	npm version patch
	$(MAKE) publish
