
var Recipe  = require('../models/recipe');
import uploadImage from '../utils/uploadImage';

export  function find (term, page) {
  return new Promise((resolve,reject) => { 
    Recipe.paginate({}, { page: page, limit: 2 }, function(err, result) {
      if (err) reject(err);

      resolve(result);
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
    delete data.image;
    parseStringifyedData(data);
    Recipe.findByIdAndUpdate(id, data, function(err, recipe) {
      if (err) reject(err);
      if(files.image){
        uploadImageAndUpdateRecipeFilename(files.image, recipe, resolve, reject);
      }else{
        resolve(recipe);
      }

    });
  });
  
};

export function add(data, files){
  return new Promise((resolve,reject) => {
    parseStringifyedData(data);
		let myRecipe = new Recipe(data); 
    myRecipe.save((err) => {
      if (err) reject(err);
      uploadImageAndUpdateRecipeFilename(files.image, myRecipe, resolve, reject);
    });		
	});
}

export function diets(){
  return getDistinctList("dietarySuitability");
}

export function ingredients(){
  return getDistinctList("ingredients.name");
}

export function quantities(){
  return getDistinctList("ingredients.quantity");
}

export function categories(){
  return getDistinctList('categories');
}

function getDistinctList(property){
  return new Promise((resolve,reject) => {
    Recipe.collection.distinct(property, function(err, results){
      if (err) reject(err);
        resolve(results);
    });
  });
}

function uploadImageAndUpdateRecipeFilename(file, recipe, resolve, reject) {
  uploadImage(file, recipe.slug).then((filename) => {
    recipe.image = filename;
    recipe.save((err) => {
      if (err) reject(err);
      resolve(recipe); 
    });
  },reject);
}

function parseStringifyedData (data) {
  data.steps = JSON.parse(data.steps);
  data.ingredients = JSON.parse(data.ingredients);
  data.categories = JSON.parse(data.categories);
  data.dietarySuitability = JSON.parse(data.dietarySuitability);
}
