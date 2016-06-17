
var Recipe     = require('../models/recipe');

export  function find () {
    return new Promise((resolve,reject) => {

 		Recipe.find(function(err, recipes) {
 			console.log(err);
            if (err) reject(err);

            resolve(recipes);
        });
  	});
};

export  function findById (id) {

	return new Promise((resolve,reject) => {

 		Recipe.find({ name: id },function(err, recipe) {
 			console.log(err);
            if (err) reject(err);

            resolve(recipe);
        });
  	});
 	
};

export function add(params){
	
  	return new Promise((resolve,reject) => {

  		let myRecipe = new Recipe();

		myRecipe.name="test";//params.name

 		myRecipe.save(function(err) {
            if (err) reject(err);

            resolve({ message: 'Recipe created!' });
        });
  	});
}
