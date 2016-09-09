import {required, validImage, createValidator, maxLength} from 'utils/validation';

const validator = createValidator({
  name: [required, maxLength(20)],
  image: [required, validImage],
});

export default function validate(values) {
  return validator(values);
}

