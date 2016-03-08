import check from 'check-types';

export default function (params, newParams, acceptedKeys) {
  if (!check.object(params)) params = {};
  if (!check.object(newParams)) newParams = {};
  if (!check.object(acceptedKeys)) throw new TypeError('accepted keys must be an object');

  for (let key in acceptedKeys) {
    let expectedType = acceptedKeys[key];
    let newValue = newParams[key];

    if (_validType(expectedType, newValue)) {
      params[key] = newValue;
    }
  }
  return params;
}

function _validType(expectedType, param) {
  if (param === null) return false;
  if (expectedType == 'date') return check.date(param);
  if (expectedType == 'array') return Array.isArray(param);
  return typeof param == expectedType;
}
