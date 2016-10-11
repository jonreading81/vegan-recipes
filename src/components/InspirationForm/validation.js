import {createValidator, required, maxLength, validImage} from 'utils/validation';

const validator = createValidator({
  title: [required, maxLength(40)],
  quote: [maxLength(1000)],
  image: [ validImage],
});

export default function validate(values) {
  return validator(values);
}

