import copyFile from '../utils/copyFile';
import get from 'lodash/get';
import fs from 'fs';
import  mime from 'mime-types';
import  lwip from 'lwip';

mime.extension('application/octet-stream')

export default function uploadImage(image, name) {
  return new Promise((resolve, reject) => {
    const path = get(image, 'path');
    if(path && name){
      const sizes= [
        [128,72],
        [256,144],
        [384,216],
        [512,288],
        [640,360],
        [768,432],
        [1024,576],
        [1248,702]
      ];
      const filename =  name + '.' + mime.extension(image.type);  
      copyFile(path, './uploads/images/original/' + filename);
      sizes.map((size, index) => {
        const newPath = './uploads/images/' + size.join('x') + '/' + filename;
        lwip.open(path, function(err, image){
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
      reject('path and slug must be set');
    }
  });
}