import {createValidator, required} from 'utils/validation';

const registerValidator = createValidator({
  name: [required]
});
export default function validate(values) {
  return registerValidator(values);
}
