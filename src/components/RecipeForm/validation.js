import {createValidator, required, maxLength, validImage, joinRules} from 'utils/validation';

const ingredientValidator = createValidator({
  name: [required, maxLength(20)],
  quantity: [required, maxLength(5)]
});

const recipeValidation = createValidator({
  title: [required, maxLength(40)],
  description: [required, maxLength(255)],
  author: [required, maxLength(20)],
  image: [required, validImage],
  ingredients: [(ingredients) => ingredients.map(ingredientValidator)],
  steps: [(steps) => steps.map(joinRules([required, maxLength(250)]))]
});

export default function validate(values) {
  return recipeValidation(values);
}

