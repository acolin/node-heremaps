import check from 'check-types';

import _makeRequest from './utils/make_request';
import _assignParams from './utils/assign_params';
import _jsonParser from './utils/json_parser';
import _constants from './config/constants';

const ACCEPTED_PARAMS = _constants.ACCEPTED_PARAMS;
const HEREMAPS_ENDPOINTS = _constants.HEREMAPS_ENDPOINTS;
const DEFAULT_MODE = "fastest;car;traffic:enabled;";
const DEFAULT_SUMMARY_ATTRS = "traveltime,distance";

export default function (target) {
  target.prototype.matrixRouting = matrixRouting;
}

function matrixRouting(params, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be present');
  }

  if (!check.object(params)) {
    return callback(new TypeError('params must be an object'));
  }

  params.mode = params.mode || DEFAULT_MODE;
  params.summaryAttributes = params.summaryAttributes || DEFAULT_SUMMARY_ATTRS;

  const args = _assignParams({}, params, ACCEPTED_PARAMS.matrixRouting);

  if (!check.assigned(args.start0)) {
    return callback(new Error('params.start0 is required'));
  }

  if (!check.assigned(args.destination0)) {
    return callback(new Error('params.destination0 is required'));
  }

  return _makeRequest(this.request, this.config, args, HEREMAPS_ENDPOINTS.matrixRouting, _jsonParser(callback));
}

