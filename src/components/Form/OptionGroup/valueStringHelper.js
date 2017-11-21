function getItemValueString(id, value) {
  let result;
  if (value === true) {
    result = id;
  }else if (!value) {
    result = '';
  }else {
    result = [id, value].join(this.delimiterB);
  }
  return result;
}


function getMultiValueString(valuesStr, id, value) {
  const objValues = this.getValuesObjectFromValueString(valuesStr);
  const arrValues = [];

  if (!value) {
    delete objValues[id];
  } else {
    objValues[id] = value;
  }

  for (const key in objValues) {
    if (objValues.hasOwnProperty(key)) {
      arrValues.push(this.getItemValueString(key, objValues[key]));
    }
  }
  return arrValues.join(this.delimiterA);
}

function getValuesObjectFromValueString(valuesStr) {
  const objValues = {};
  valuesStr.split(this.delimiterA).forEach((item) => {
    const arrItem = item.split(this.delimiterB);
    const index = arrItem[0];
    const val = (arrItem.length === 1) ? true : arrItem[1];
    objValues[index] = val;
  });
  return objValues;
}

function getValueFromValueString(valuesStr = '', id) {
  const objValues = this.getValuesObjectFromValueString(valuesStr);
  if (objValues.hasOwnProperty(id)) {
    return objValues[id];
  }
  return false;
}

const valueStingHelper = {
  delimiterA: '',
  delimiterB: '',
  getItemValueString,
  getMultiValueString,
  getValuesObjectFromValueString,
  getValueFromValueString
};

export default valueStingHelper;
