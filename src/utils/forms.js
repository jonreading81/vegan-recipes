import isString from 'lodash/isString';

export function mapSelectValueToArray(value) {
  if (isString(value)) {
    return value.split(',');
  }
  return [];
}
