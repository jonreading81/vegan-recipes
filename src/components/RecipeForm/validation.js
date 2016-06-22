import {createValidator, required, maxLength} from 'utils/validation';

const recipeValidation = createValidator({
  title: [required, maxLength(10)],
  author: [required, maxLength(5)],
});
export default function validate(values) {
  return recipeValidation(values);
}
