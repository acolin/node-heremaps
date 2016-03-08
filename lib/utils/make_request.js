import qs from 'qs';
import check from 'check-types';

const REQUEST_MAX_LENGTH = 2048;
const API_VERSION = 6.2;
const GEN = 8;

export default function(request, config, args, path, callback) {
  let error;

  if (_invalidCredentials(config)) {
    return _handleError('You must provide app_id and app_code credentials.');
  }

  args.app_id = config.app_id;
  args.app_code = config.app_code;
  args.gen = config.gen || GEN;
  let qString = _buildQString(args);

  if (qString.length > REQUEST_MAX_LENGTH) {
    return _handleError('Request too long, exceeds ${REQUEST_MAX_LENGTH} characters.');
  }

  let options = {
    uri: _buildURL(path, qString, {version: config.version || API_VERSION})
  }

  if (typeof callback !== 'function') return options.uri;

  request(options, (error, res, data) => {
    return _handleRes(error, res, data, cb);
  });
}

function _handleRes(error, res, data, callback) {
  if (error) return callback(error);
  if (res.statusCode === 200) return callback(null, data);

  let statusError = new Error(data);
  statusError.code = res.statusCode;
  return callback(statusError, data);
}

function _buildURL(path, qString, options) {
  return `https://${path.subdomain}.api.here.com/${options.version}/${path.path}?${qString}`;
}

function _buildQString(args) {
  const qsConfig = {indices: false, arrayFormat: 'repeat'};

  return qs.stringify(args, qsConfig);
}

function _handleError(message, callback) {
  const error = new Error(message);

  if (typeof callback === 'function') return callback(error);
  throw error;
}

function _invalidCredentials(config) {
  if (!check.assigned(config.app_id) || !check.assigned(config.app_code)) {
    return true;
  }
}
