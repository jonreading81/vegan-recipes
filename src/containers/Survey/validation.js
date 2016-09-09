import {createValidator, required} from 'utils/validation';

const registerValidator = createValidator({
  questionA: [required],
  questionB: [required],
  questionC: [required],
  questionD: [required],
  questionE: [required],
  questionF: [required],
  questionH: [required],
  questionI: [required],
  questionJ: [required]
});
export default function validate(values) {
  return registerValidator(values);
}
