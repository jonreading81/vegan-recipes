import fs from 'fs';
import filter from 'lodash/filter';
import copyFile from './copyFile';
import deleteFile from './deleteFile';
import get from 'lodash/get';
import map from 'lodash/map';
import  mime from 'mime-types';
import  im from 'imagemagick';
const async = require('async'); 
const destinationPath =  './static/images/';

export const imagesPath = 'api/images/';

export const sizes = require('../data/imageSizes.json');

export const getImages = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(imagesPath, (err, _images) => {
      if (err) reject(err);
      resolve(filter(_images, (image) => image !== '.DS_Store'));
    });
  });
}

export const searchImage = (search, image) => {
  if( image.search(search) !== -1){
    return true;
  }
  return false;
}


export const getFilenameFromSlug = (slug) => {
  const seperator = slug.lastIndexOf('-');
  const name = slug.substr(0, seperator);
  const ext = slug.substr(seperator + 1);
  const image = name + '.' + ext;
  return image;
}

export const getImageWithPath = (image) => {
  return {
    name: image.slice(0, -5),
    filename: image,
    path: imagesPath + image
  };
}

export const getImagesWithPath = () => {
  return new Promise((resolve, reject) => {
    getImages().then((images) => {
      resolve(images.map(getImageWithPath));
    });
  });
}

export const deleteImage = (name) => {
  const filename = imagesPath + name;
  return deleteFile(filename);
}

export const uploadImage = (image, name) => {
  return new Promise((resolve, reject) => {
    const path = get(image, 'path');
    if(path && name){
    
      const filename =  name + '.' + mime.extension(image.type);  
      const destination = imagesPath + filename;
      copyFile(path, destination)
        .then(() =>  deleteFile(path))
        .then(() => {
          console.log('resolve');
          convertImage(destination, filename);
          resolve(filename);
        });
      
    }
    else{
      reject('path and name must be set');
    }
  });
}

export const convertImage = (sourcePath, filename) => {
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


