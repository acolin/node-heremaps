import {spy, expect} from 'chai';
import _geocode from '../lib/geocode';
import vcr from "nock-vcr-recorder-mocha";
import defaultRequest from 'request';
import API_KEYS from './mocks/api_keys';

@_geocode
class Stub {
  constructor() {
    this.config = API_KEYS;
    this.request = defaultRequest;
  }
}

describe('geocode', () => {
  const stub = new Stub();

  it('throws error when callback not present', () => {
    const geocodeCb = () => stub.geocode({});

    expect(geocodeCb).to.throw(TypeError, /callback must be present/);
  });

  it('throws error when params are not an object', () => {
    const cbSpy = spy(() => {});

    stub.geocode(null, cbSpy);

    expect(cbSpy).to.have.been.called.with(new TypeError('params must be an object'));
  });

  it('throws error when address is not present', () => {
    const cbSpy = spy(() => {});

    stub.geocode({}, cbSpy);

    expect(cbSpy).to.have.been.called.with(new Error('params.address is required'));
  });

  vcr.it("geocodes a given address", done => {
    const hereMapsAPI = new Stub();

    hereMapsAPI.geocode({searchtext: "rio guadalquivir 422A, san pedro garza garcia, NL, Mexico"}, done);
  });
});
