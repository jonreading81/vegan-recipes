import {required, validImage, createValidator, maxLength, alphanumeric} from 'utils/validation';

const validator = createValidator({
  name: [required, maxLength(20), alphanumeric],
  image: [required, validImage],
});

export default function validate(values) {
  return validator(values);
}

