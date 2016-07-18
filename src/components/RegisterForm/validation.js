import {createValidator, required, password, email} from 'utils/validation';

const registerValidator = createValidator({
  email: [required, email],
  givenName: [required],
  surname: [required],
  password: [required, password],
});
export default function validate(values) {
  return registerValidator(values);
}
