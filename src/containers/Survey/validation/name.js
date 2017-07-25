import {createValidator} from 'utils/validation';

const registerValidator = createValidator({
});
export default function validate(values) {
  return registerValidator(values);
}
