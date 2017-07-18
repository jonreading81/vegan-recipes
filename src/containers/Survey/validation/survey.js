import {createValidator, required} from 'utils/validation';

const registerValidator = createValidator({
  question1: [required],
  question2: [required],
  question3: [required],
  question4: [required]
});
export default function validate(values) {
  return registerValidator(values);
}
