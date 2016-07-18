import {createValidator, required, password} from 'utils/validation';

const loginValidator = createValidator({
  username: [required],
  password: [required, password],
});
export default function validate(values) {
  return loginValidator(values);
}
