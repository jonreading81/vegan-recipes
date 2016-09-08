
import  {
  imagesPath,
  getImages,
  uploadImage,
  deleteImage as _deleteImage
} from '../utils/images';

export const getAll = () => {
  return getImages();
};


export const update = (data, files) => {
  return new Promise((resolve,reject) => {
    uploadImage(files.image, data.name).then((filename) => {
      resolve(filename); 
    },reject);
  });
}

export const deleteImage = (data) => {
  return new Promise((resolve,reject) => {
    _deleteImage(data.name).then(resolve, reject);
  });
}

