import {createValidator, required, maxLength, validImage, validateList} from 'utils/validation';

const ingredientValidator = createValidator({
  name: [required, maxLength(20)],
  quantity: [required, maxLength(20)]
});

const recipeValidation = createValidator({
  title: [required, maxLength(40)],
  shortDescription: [required, maxLength(100)],
  description: [required, maxLength(500)],
  difficulty: [required, maxLength(20)],
  image: [required, validImage],
  yields: [required, maxLength(20)],
  preperationTime: [required, maxLength(20)],
  cookingTime: [required, maxLength(20)],
  ingredients: [(ingredients = []) => ingredients.map(ingredientValidator)],
  steps: validateList([required, maxLength(1000)]),
  categories: validateList([required, maxLength(20)]),
  dietarySuitability: validateList([required, maxLength(20)])
});

export default function validate(values) {
  return recipeValidation(values);
}

