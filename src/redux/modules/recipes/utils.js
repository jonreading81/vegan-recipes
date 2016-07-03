import forOwn from 'lodash/forOwn';

export function formatFormData(data) {
  const formData = new FormData();
  forOwn(data, (value, key) => {
    formData.append(key, value);
  });
  formData.append('imageURL', data.imageURL[0]);
  return formData;
}
