import copyFile from '../utils/copyFile';
import get from 'lodash/get';
import fs from 'fs';
import  mime from 'mime-types';
import  convertImage from './convertImage';

const imagesPath = 'api/images/';

export default function uploadImage(image, name) {
  return new Promise((resolve, reject) => {
    const path = get(image, 'path');
    if(path && name){
    
      const filename =  name + '.' + mime.extension(image.type);  
      const destination = imagesPath + filename;

      copyFile(path, destination)
        .then(() => convertImage(destination, filename).then(resolve, reject)
          ,reject);
      
    }
    else{
      reject('path and slug must be set');
    }
  });
}