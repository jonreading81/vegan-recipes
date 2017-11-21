clean:
	@npm uninstall 

install-npm:
	@npm3 install --unsafe-perm

build:
	@npm run build

backup-data:
	mongodump --db test -o ./data

backup-content:
	git add .
	git commit -m 'Added data' > log
	git push https://github.com/jonreading81/vegan-recipes.git

backup-all: backup-data backup-content

restore-data:
	mongorestore --db test ./data/test

deploy:
	tar -cvf recipes.tar ./
	aws s3 cp s3://vegan-recipe-deployments/recipes.tar  s3://vegan-recipe-deployments/recipes.rollback.tar 
	aws s3 cp recipes.tar  s3://vegan-recipe-deployments

get-google-creds:
	aws s3 cp s3://vegan-recipe-deployments/creds/google.json  ./api/data/google.json

retrieve-deployment:
	aws s3 cp s3://vegan-recipe-deployments/recipes.tar ../recipes.tar

install: install-npm restore-data

get-latest: 
	git pull;

install-latest: get-latest install

deploy-latest: install-latest get-google-creds deploy

.PHONY: clean
