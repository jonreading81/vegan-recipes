import fs from 'fs';
import {convertImage, getImages, imagesPath ,sizes as imageSizes} from './utils/images';
const destinationPath = 'static/images/';
const async = require('async'); 

function createDirectory(dir){ 
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      console.info('createDirectory: '+ dir);
    }
}

function createDirectorties(){
  console.info('createDirectorties');
  let dir;
  createDirectory(destinationPath);
  imageSizes.map((size) => {
    dir = destinationPath +  size.join('x');
    console.info(dir);
    createDirectory(dir);
  });
}

function convertImages(){
  console.info('Converting Images');
  getImages().then((images) => {
    let actions = [];
    images.map((image) => {
      actions.push(function(next){
        console.info(imagesPath + image);
        convertImage(imagesPath + image, image).then(() => {
          console.info('converted image: '+ image);
          next();
        },console);
      });
    });
    async.series(actions);
  });
}

createDirectorties();
convertImages();
