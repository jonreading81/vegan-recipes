import {createValidator, required, maxLength, validImage} from 'utils/validation';

const ingredientValidator = createValidator({
  name: [required, maxLength(20)],
  quantity: [required, maxLength(5)]
});

const stepsValidator = createValidator({
  step: [required, maxLength(255)]
});

const categoryValidator = createValidator({
  category: [required, maxLength(20)]
});


const recipeValidation = createValidator({
  title: [required, maxLength(40)],
  description: [required, maxLength(255)],
  author: [required, maxLength(20)],
  image: [required, validImage],
  ingredients: [(ingredients) => ingredients.map(ingredientValidator)],
  steps: [(steps) => steps.map(stepsValidator)],
  categories: [(categories) => categories.map(categoryValidator)]
});

export default function validate(values) {
  return recipeValidation(values);
}

