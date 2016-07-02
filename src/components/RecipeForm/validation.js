import {createValidator, required, maxLength} from 'utils/validation';

const recipeValidation = createValidator({
  title: [required, maxLength(40)],
  description: [required, maxLength(255)],
  author: [required, maxLength(20)],
  imageURL: [required],
});
export default function validate(values) {
  return recipeValidation(values);
}
