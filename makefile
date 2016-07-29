clean:
	@npm uninstall 

install-npm:
	@npm install

build:
	@npm run build

backup-data:
	mongodump --db test -o ./data

restore-data:
	mongorestore --db test ./data

deploy:
	tar -cvf recipes.tar vegan-recipes/

install: install-npm restore-data

.PHONY: clean
