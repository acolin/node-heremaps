export default function (callback) {
  if (typeof callback !== 'function') {
    return false;
  }

  return function (error, jsonString) {
    if (error) {
      return callback(error);
    }

    try {
      callback(error, JSON.parse(jsonString));
    } catch (e) {
      return callback(e);
    }
  };
}
