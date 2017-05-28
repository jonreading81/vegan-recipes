
import Model  from '../models/inspiration';
import {createActions} from './crud';

const  parseData =  (data) => {
}

const getPaginatedItemPromise = (_item,query,index) => {
  return new Promise((resolve, reject) => {
    Model.findOne({_id: query}).sort({_id: index}).exec(function(err, item) {
      if (err) reject(err);
      resolve(item);
    });
  });
}


Model.syncRandom(function (err, result) {
});

const defaultActions = createActions(Model, parseData);
module.exports = {
  ...defaultActions,

  getCollectionWithItem: (slug) => {
    return new Promise((resolve,reject) => {
     Model.find({ slug: slug },function(err, items) {
        if (err) reject(err);
        if(items.length==0){
          reject({message: "Item not found"});
        }else{
          const item = items[0];
          const exclude = new RegExp(slug);
          Model.findRandom({ slug:{$not: exclude}}).limit(10).exec(function(err, items) {
            if (err) reject(err);
            items.unshift(item);
            resolve(items);
          });
        }
      });
    });
  },

   getSlideshowItem: (slug) => {
    return new Promise((resolve,reject) => {
     Model.find({ slug: slug },function(err, items) {
        if (err) reject(err);
        if(items.length==0){
          reject({message: "Item not found"});
        }else{
          const item = items[0];
          Promise.all([getPaginatedItemPromise(item,{$lt: item._id},-1), getPaginatedItemPromise(item,{$gt: item._id},1)]).then(values => { 
            resolve({
              prev: values[0],
              item:item,
              next: values[1]
            });
          });
         
        }
      });
    });
  },

  getRandomCollection: () => {
    return new Promise((resolve,reject) => {
      Model.findRandom().limit(10).exec(function(err, items) {
        if (err) reject(err);
        resolve(items);
      });
    });
  }
};

