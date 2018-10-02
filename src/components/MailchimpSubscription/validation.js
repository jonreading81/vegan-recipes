import {createValidator, required, email} from 'utils/validation';

const registerValidator = createValidator({
  email: [required, email],
  name: [required]
});
export default function validate(values) {
  return registerValidator(values);
}
