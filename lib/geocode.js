import check from 'check-types';

import _makeRequest from './utils/make_request';
import _assignParams from './utils/assign_params';
import _jsonParser from './utils/json_parser';
import _constants from './config/constants';

const ACCEPTED_PARAMS = _constants.ACCEPTED_PARAMS;
const HEREMAPS_ENDPOINTS = _constants.HEREMAPS_ENDPOINTS;

export default function (target) {
  target.prototype.geocode = geocode;
}

function geocode(params, callback) {
  if (typeof callback !== 'function') throw new TypeError('callback must be present');

  if (!check.object(params)) return callback(new TypeError('params must be an object'));

  let args = _assignParams({}, params, ACCEPTED_PARAMS.geocode);

  if (!check.assigned(args.address)) return callback(new Error('params.address is required'));

  return _makeRequest(this.request, this.config, HEREMAPS_ENDPOINTS.geocode, args, _jsonParser(callback));
}
