import forOwn from 'lodash/forOwn';
import isArray from 'lodash/isArray';

export function formatFormData(data) {
  const formData = new FormData();
  forOwn(data, (fieldValue, fieldIndex) => {
    if (isArray(fieldValue)) {
      formData.append(fieldIndex, JSON.stringify(fieldValue));
    }else {
      formData.append(fieldIndex, fieldValue);
    }
  });
  formData.append('image', data.image[0]);
  return formData;
}
