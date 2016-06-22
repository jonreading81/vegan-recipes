import {createValidator, required, maxLength} from 'utils/validation';

const recipeValidation = createValidator({
  title: [required, maxLength(10)],
});
export default function validate(values) {
  console.log('validate');
  return recipeValidation(values);
}
