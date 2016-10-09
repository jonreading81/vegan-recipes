
import Model  from '../models/inspiration';
import {createActions} from './crud';

const  parseData =  (data) => {
}

Model.syncRandom(function (err, result) {
  console.log(result.updated);
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

  getRandomCollection: () => {
    return new Promise((resolve,reject) => {
      Model.findRandom().limit(10).exec(function(err, items) {
        if (err) reject(err);
        resolve(items);
      });
    });
  }
};

