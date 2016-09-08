
import  {
  imagesPath,
  getImagesWithPath,
  getImages,
  uploadImage,
  deleteImage as _deleteImage } from '../utils/images';
import paginateArray from '../utils/paginateArray';
import filter from 'lodash/filter';

const searchImage = (search, image) => {
  if( image.search(search) !== -1){
    return true;
  }
  return false;
}

export const getAll = () => {
  return getImages();
};


export const getPaginated = (search, page) => {
  return new Promise((resolve,reject) => {
    getAll().then(images => {
      let filteredImages;
      if(search != 'all'){
        filteredImages = filter(images, searchImage.bind(this,search));
      }else{
        filteredImages = images;
      }
      
      resolve(paginateArray(filteredImages, 12 , page));
    })
  });
};

export const update = (data, files) => {
  return new Promise((resolve,reject) => {
    uploadImage(files.image, data.name).then(filename=> {
      console.log('resolve');
      resolve(filename); 
    },reject);
  });
}

export const deleteImage = (id) => {
  return new Promise((resolve,reject) => {
    _deleteImage(id + '.jpeg').then(resolve, reject);
  });
}

