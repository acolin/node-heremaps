import {spy, expect} from 'chai';
import _matrixRouting from '../lib/matrix_routing';
import vcr from "nock-vcr-recorder-mocha";
import defaultRequest from 'request';
import API_KEYS from './mocks/api_keys';

@_matrixRouting
class Stub {
  constructor() {
    this.config = API_KEYS;
    this.request = defaultRequest;
  }
}

describe('matrixRouting', () => {
  const stub = new Stub();

  it('throws error when callback not present', () => {
    const matrixRoutingCb = () => stub.matrixRouting({});

    expect(matrixRoutingCb).to.throw(TypeError, /callback must be present/);
  });

  it('throws error when params are not an object', () => {
    const cbSpy = spy(() => {});

    stub.matrixRouting(null, cbSpy);

    expect(cbSpy).to.have.been.called.with(new TypeError('params must be an object'));
  });

  it('throws error when start0 is not present', () => {
    const cbSpy = spy(() => {});

    stub.matrixRouting({}, cbSpy);

    expect(cbSpy).to.have.been.called.with(new Error('params.start0 is required'));
  });

  it('throws error when destination0 is not present', () => {
    const cbSpy = spy(() => {});

    stub.matrixRouting({start0: ""}, cbSpy);

    expect(cbSpy).to.have.been.called.with(new Error('params.destination0 is required'));
  });

  vcr.it("return routes for a given start and destination", done => {
    const hereMapsAPI = new Stub();

    hereMapsAPI.matrixRouting({start0: "25.6586716,-100.3583278", destination0: "25.6522234,-100.2942806"}, done);
  });
});
