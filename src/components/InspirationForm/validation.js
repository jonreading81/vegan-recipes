import {createValidator, required, maxLength, validImage} from 'utils/validation';

const validator = createValidator({
  title: [required, maxLength(40)],
  image: [required, validImage],
});

export default function validate(values) {
  return validator(values);
}

