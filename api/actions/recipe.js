
var Recipe  = require('../models/recipe');
import uploadImage from '../utils/uploadImage';

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

export  function findByIdAndUpdate (id, data, files) {
  return new Promise((resolve,reject) => {
    delete data.imageURL;
    Recipe.findByIdAndUpdate(id, data, function(err, recipe) {
      if (err) reject(err);
      if(files.imageURL){
        uploadImageAndUpdateRecipeFilename(files.imageURL, recipe, resolve, reject);
      }else{
        resolve(recipe);
      }

    });
  });
  
};

export function add(data, files){
  return new Promise((resolve,reject) => {
		let myRecipe = new Recipe(data); 
    myRecipe.save((err) => {
      if (err) reject(err);
      uploadImageAndUpdateRecipeFilename(files.imageURL, myRecipe, resolve, reject);
    });		
	});
}

function uploadImageAndUpdateRecipeFilename(file, recipe, resolve, reject) {
  uploadImage(file, recipe.slug).then((filename) => {
    recipe.imageURL = filename;
    recipe.save((err) => {
      if (err) reject(err);
      resolve(recipe); 
    });
  },reject);
}
