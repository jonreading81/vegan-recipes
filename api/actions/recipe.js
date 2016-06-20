
var Recipe     = require('../models/recipe');

export  function find () {
    return new Promise((resolve,reject) => {

 		Recipe.find(function(err, recipes) {
            if (err) reject(err);

            resolve(recipes);
        });
  	});
};

export  function findById (id) {

	return new Promise((resolve,reject) => {

 		Recipe.find({ id: id },function(err, recipe) {
            if (err) reject(err);

            resolve(recipe);
        });
  	});
 	
};

export  function findBySlug (slug) {

  return new Promise((resolve,reject) => {

    Recipe.find({ slug: slug },function(err, recipe) {
            if (err) reject(err);

            resolve(recipe);
        });
    });
  
};

export function add(params){
	
  	return new Promise((resolve,reject) => {

  		let myRecipe = new Recipe();

		  myRecipe= Object.assign(myRecipe,params);

      console.log(params);
   		myRecipe.save(function(err) {
       
        if (err) {
          reject(err);
        }
        resolve({ message: 'Recipe created!' });
      });

  	});

}
