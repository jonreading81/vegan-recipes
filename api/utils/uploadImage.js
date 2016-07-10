import copyFile from '../utils/copyFile';
import get from 'lodash/get';
import  mime from 'mime-types';

mime.extension('application/octet-stream')

export default function uploadImage(image, name) {
  return new Promise((resolve, reject) => {
    const path = get(image, 'path');
    const filename =  name + '.' + mime.extension(image.type);  
    if(path && name){
      copyFile(path, './uploads/images/' + filename)
        .then(() => {
          resolve(filename);
        },
        reject
      );
    }
    else{
      reject('path and slug must be set');
    }
  });
}