
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

export  function findByIdAndRemove (id) {

  return new Promise((resolve,reject) => {

    Recipe.findByIdAndRemove(id,function(err, recipe) {
            if (err) reject(err);

             resolve({ message: 'Recipe deleted!' });
        });
    });
  
};

export  function findByIdAndUpdate (id, data) {
  return new Promise((resolve,reject) => {

    Recipe.findByIdAndUpdate(id, data, function(err, recipe) {
            if (err) reject(err);

             resolve(recipe);
        });
    });
  
};


export  function findBySlug (slug) {

  return new Promise((resolve,reject) => {

    Recipe.find({ slug: slug },function(err, recipes) {
            if (err) reject(err);

            if(recipes.length==0){
              reject({message: "Recipe not found"});
            }else{
                 resolve(recipes[0]);
               }
        });
    });
  
};

export function add(params){
    params=Object.assign({
      title:''
    },params);
	
  	return new Promise((resolve,reject) => {
  		let myRecipe = new Recipe(params);
 
   		myRecipe.save(function(err) {
        if (err) reject(err);
        resolve(myRecipe);       
           
      });
  	});
}
