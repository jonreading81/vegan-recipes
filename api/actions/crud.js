import {uploadImage} from '../utils/images';

function uploadImageAndUpdateFilename(file, item, resolve, reject) {
  uploadImage(file, item.slug).then((filename) => {
    item.image = filename;
    item.save((err) => {
      if (err) reject(err);
      resolve(item); 
    });
  },reject);
}

function find (model, term, page) {
    return new Promise((resolve,reject) => {
      let query = {};
      if(term !== 'all'){
        query =  { $text: { $search: term }};
      }
      model.paginate(query, { 
        sort:{updatedAt: -1}, 
        page: page, 
        limit: 12, 
      }, function(err, result) {
        if (err) reject(err);

        resolve(result);
      });
    });
};

function findById (model, id) {

  return new Promise((resolve,reject) => {

    model.find({ id: id },function(err, recipe) {
      if (err) reject(err);
      resolve(recipe);
    });
  });
};

function findByIdAndRemove (model, id) {

  return new Promise((resolve,reject) => {

    model.findByIdAndRemove(id,function(err, recipe) {
      if (err) reject(err);
      resolve({ message: 'Inspirstion deleted!' });
    });
  });
};

function findBySlug (model, slug) {

  return new Promise((resolve,reject) => {

    model.find({ slug: slug },function(err, items) {
      if (err) reject(err);
      if(items.length==0){
        reject({message: "Item not found"});
      }else{
           resolve(items[0]);
      }
    });
  });
};

function findByIdAndUpdate (model, parseData, id, data, files) {
  return new Promise((resolve,reject) => {
    delete data.image;
    parseData(data);
    model.findByIdAndUpdate(id, data, function(err, item) {
      if (err) reject(err);
      if(files.image){
        uploadImageAndUpdateFilename(files.image, item, resolve, reject);
      }else{
        resolve(item);
      }
    });
  });
};

function add(model, parseData, data, files){
  return new Promise((resolve,reject) => {
    parseData(data);
    let myModel= new model(data); 
    myModel.save((err, item) => {
      if (err) reject(err);
      if(files.image){
        uploadImageAndUpdateFilename(files.image, myModel, resolve, reject);
      }
      else{
        resolve(item);
      }
    });
  });
}

function getDistinctList(model, property){
  return new Promise((resolve,reject) => {
    model.collection.distinct(property, function(err, results){
      if (err) reject(err);
        resolve(results);
    });
  });
}



export const createActions = (model, parseData) => {
  return {
    find: (term, page) => {
      return find (model, term, page);
    },
    findById: (id) => {
      return findById (model, id); 
    },
    findByIdAndRemove: (id) => {
      return findByIdAndRemove (model, id) ;
    },
    findBySlug: (slug) => {
      return findBySlug (model, slug);
    },
    findByIdAndUpdate: (id, data, files) => {
      return findByIdAndUpdate (model, parseData, id, data, files);
    },
    add: (data, files) => {
      return add (model, parseData, data, files);
    },
    getDistinctList: (property) => {
      return getDistinctList(model, property);
    }
  }
}