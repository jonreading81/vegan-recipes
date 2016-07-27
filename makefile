clean:
  @npm uninstall 

install-npm:
  @npm install

build:
  @npm build

restore-data:
  mongorestore --db test ./data


install: install-npm build restore-data


.PHONY: clean