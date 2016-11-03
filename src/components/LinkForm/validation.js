import {createValidator, required, maxLength, validImage, isURL} from 'utils/validation';

const validator = createValidator({
  title: [required, maxLength(40)],
  description: [required, maxLength(255)],
  URL: [required, isURL],
  image: [ validImage],
});

export default function validate(values) {
  return validator(values);
}

