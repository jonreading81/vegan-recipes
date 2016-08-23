import  im from 'imagemagick';
const sizes = require('../data/imageSizes.json');

const destinationPath =  './static/images/';

export default function convertImage(sourcePath, filename) {
  return new Promise((resolve, reject) => {
    if(filename && sourcePath){
      sizes.map((size, index) => {
        const newPath = destinationPath + size.join('x') + '/' + filename;
        const config = {
          srcPath: sourcePath,
          dstPath: newPath,
          width: size[0],
          height: size[1]
        };
        console.log(config);
        im.crop(config,
        function(err, stdout, stderr){
          if (err) reject(err);
          console.log('resized '+ sourcePath + ' to fit within' + size.join('x'));
          resolve(filename);
        });

      });
    }
    else{
      reject('path and filename must be set');
    }
  });
}
