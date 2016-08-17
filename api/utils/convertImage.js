import  lwip from 'lwip';
const sizes = require('../data/imageSizes.json');

const destinationPath =  './static/images/';

export default function convertImage(sourcePath, filename) {
  return new Promise((resolve, reject) => {
    if(filename && sourcePath){
      sizes.map((size, index) => {
        const newPath = destinationPath + size.join('x') + '/' + filename;
        lwip.open(sourcePath, function(err, image){
          if(err) reject(err);
          image.batch().cover(size[0], size[1]).writeFile(newPath, function(err){
            if(err) reject(err);
            if(index === (sizes.length -1)){
              resolve(filename);
            }
          
          });
        });
      });
    }
    else{
      reject('path and filename must be set');
    }
  });
}
