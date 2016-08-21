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
	tar -cvf recipes.tar ./
	aws s3 cp recipes.tar  s3://vegan-recipe-deployments

retrieve-deployment:
	aws s3 cp s3://vegan-recipe-deployments/recipes.tar ../recipes.tar

install: install-npm restore-data

.PHONY: clean
