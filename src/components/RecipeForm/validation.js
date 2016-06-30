import {createValidator, required, maxLength, validImage} from 'utils/validation';

const recipeValidation = createValidator({
  title: [required, maxLength(40)],
  description: [required, maxLength(255)],
  author: [required, maxLength(20)],
  imageURL: [required, validImage],
});
export default function validate(values) {
  return recipeValidation(values);
}
