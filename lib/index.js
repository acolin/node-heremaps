import defaultRequest from 'request';
import check from 'check-types';

import _assignParams from './utils/assign_params';
import _constants from './config/constants';

// Available API endpoints
import _geocode from './geocode';
import _matrixRouting from './matrix_routing';

const ACCEPTED_CONFIG_KEYS = _constants.ACCEPTED_CONFIG_KEYS;

@_geocode
@_matrixRouting
export default class HereMapsAPI {
  constructor(config, request) {
    this.config = _initConfig(config);
    this.request = _initRequest(request);
  }
}

function _initConfig(config) {
  if (!check.object(config)) {
    config = {};
  }

  return _assignParams({}, config, ACCEPTED_CONFIG_KEYS);
}

function _initRequest(request) {
  if (typeof request !== 'function') {
    return defaultRequest;
  }

  return request;
}
