const isEmpty = value => value === undefined || value === null || value === '';
import isArray from 'lodash/isArray';

export const joinRules = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];


export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function password(value) {
  if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
    return 'Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Numbers';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function alphanumeric(value) {
  if (! /^[a-zA-Z0-9-]*$/.test(value)) {
    return 'Only Alpha numeric charachters and - permitted';
  }
}

export function validImage(fileList) {
  if (fileList && fileList.length && fileList.length === 1) {
    const image = fileList.item(0);
    if (image.size > 1024000) {
      return 'Image must be less than 1MB';
    }
    if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
      return 'Image must be a JPEG or PNG';
    }
  }
}

export function validateList(rules = []) {
  return (list = []) => list.map(joinRules(rules));
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = joinRules([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (isArray(data[key]) && error) {
        errors[key] = [];
        error.map((_error) => {
          errors[key].push(_error);
        });
      }else {
        if (error) {
          errors[key] = error;
        }
      }
    });
    return errors;
  };
}
