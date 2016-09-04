import {createValidator, required, email} from 'utils/validation';

const registerValidator = createValidator({
  name: [required],
  email: [required, email],
  questionA: [required],
  questionB: [required],
  questionC: [required]

});
export default function validate(values) {
  return registerValidator(values);
}
