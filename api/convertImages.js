import fs from 'fs';
import convertImage from './utils/convertImage';
const imageSizes = require('./data/imageSizes.json');
const imagesPath = 'api/images/';
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
  fs.readdir(imagesPath, (err, images) => {
    let actions = [];
    console.info(images);
    images.map((image) => {
      actions.push(function(next){
        console.log('action');
        if(image !== '.DS_Store') {
          console.info(image);
           convertImage(imagesPath + image, image).then(() => {
            console.info('converted image: '+ image);
            next();
           });
        }else{
          next();
        }
      });
    });
     console.info(actions);
    async.series(actions);
  });
}

createDirectorties();
convertImages();
