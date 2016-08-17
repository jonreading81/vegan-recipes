import fs from 'fs';
import  convertImage from './utils/convertImage';
const imagesPath = 'api/images/';

console.info('converting Images');

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