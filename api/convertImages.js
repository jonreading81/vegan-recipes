import fs from 'fs';
import convertImage from './utils/convertImage';
const imageSizes = require('./data/imageSizes.json');
const imagesPath = 'api/images/';
const destinationPath = 'static/images/';

console.info('converting Images');

function createDirectory(dir){ 
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      console.info('createDirectory: '+ dir);
    }
}

function createDirectorties(){
  let dir;
  createDirectory(destinationPath);
  imageSizes.map((size) => {
    dir = destinationPath +  size.join('x');
    createDirectory(dir);
  });
}

function convertImages(){
  fs.readdir(imagesPath, (err, images) => {
      images.map((image) => {
        if(image !== '.DS_Store') {
          console.info(image);
           convertImage(imagesPath + image, image).then(() => {
            console.info('converted image: '+ image);
           });
        }
      });
  });
}

createDirectorties();
convertImages();
