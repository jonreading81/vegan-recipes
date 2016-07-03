export function getDefaultReducerActions(state) {
  return state;
}

export function getActionType(entity, action) {
  return ['vegan-recipes', entity, action].join('/');
}

export function formatFormData(data) {
  return data;
}
