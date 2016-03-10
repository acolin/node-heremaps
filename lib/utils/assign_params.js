import check from 'check-types';

export default function (params, newParams, acceptedKeys) {
  params = _initObjParams(params);
  newParams = _initObjParams(newParams);

  if (!check.object(acceptedKeys)) {
    throw new TypeError('accepted keys must be an object');
  }

  for (const key in acceptedKeys) {
    if ({}.hasOwnProperty.call(acceptedKeys, key)) {
      const expectedType = acceptedKeys[key];
      const newValue = newParams[key];

      if (_validType(expectedType, newValue)) {
        params[key] = newValue;
      }
    }
  }

  return params;
}

function _initObjParams(params) {
  if (!check.object(params)) {
    return {};
  }

  return params;
}

function _validType(expectedType, param) {
  if (param === null) {
    return false;
  }

  if (expectedType === 'date') {
    return check.date(param);
  }

  if (expectedType === 'array') {
    return Array.isArray(param);
  }

  return typeof param === expectedType;
}
