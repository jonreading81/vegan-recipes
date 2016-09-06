import  im from 'imagemagick';
const sizes = require('../data/imageSizes.json');
const async = require('async'); 

const destinationPath =  './static/images/';

export default function convertImage(sourcePath, filename) {
  return new Promise((resolve, reject) => {
    if(filename && sourcePath){
      let actions = [];
      const finish =  function (next){
        resolve(filename);
        next();
      }

      sizes.map((size, index) => {
        actions.push(function(next){
          const newPath = destinationPath + size.join('x') + '/' + filename;
          const config = {
            srcPath: sourcePath,
            dstPath: newPath,
            quality:0.8,
            width: size[0],
            height: size[1]
          };
          im.crop(config,
          function(err, stdout, stderr){
            if (err) reject(err);
            console.log('resized '+ sourcePath + ' to fit within' + size.join('x'));
            next();
          });
        });
      });

      actions.push(finish);
      async.series(actions);

    }
    else{
      reject('path and filename must be set');
    }
  });
}

