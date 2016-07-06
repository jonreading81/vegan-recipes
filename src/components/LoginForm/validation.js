import {createValidator, required, password} from 'utils/validation';

const recipeValidation = createValidator({
  username: [required],
  password: [required, password],
});
export default function validate(values) {
  return recipeValidation(values);
}
