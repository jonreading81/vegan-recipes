import  im from 'imagemagick';
const sizes = require('../data/imageSizes.json');
const async = require('async'); 
<<<<<<< HEAD

=======
>>>>>>> bdcec50a126d4f9c743a74652ab7ed3a55d44e26
const destinationPath =  './static/images/';

export default function convertImage(sourcePath, filename) {
  return new Promise((resolve, reject) => {
    if(filename && sourcePath){
      let actions = [];
      const finish =  function (next){
        resolve(filename);
        next();
      }
<<<<<<< HEAD

=======
>>>>>>> bdcec50a126d4f9c743a74652ab7ed3a55d44e26
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
<<<<<<< HEAD

      actions.push(finish);
      async.series(actions);

=======
      actions.push(finish);
      async.series(actions);
>>>>>>> bdcec50a126d4f9c743a74652ab7ed3a55d44e26
    }
    else{
      reject('path and filename must be set');
    }
  });
}

