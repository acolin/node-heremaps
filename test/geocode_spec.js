import {spy, expect} from 'chai';
import geocode from '../lib/geocode';

describe('geocode', () => {
  it('throws error when callback not present', () => {
    let geocodeCb = () => geocode({});

    expect(geocodeCb).to.throw(TypeError, /callback must be present/);
  });

  it('throws error when params are not an object', () => {
    const cbSpy = spy((error, data) => {});

    geocode(null, cbSpy);

    expect(cbSpy).to.have.been.called.with(new TypeError('params must be an object'));
  });

  it('throws error when address is not present', () => {
    const cbSpy = spy((error, data) => {});

    geocode({}, cbSpy);

    expect(cbSpy).to.have.been.called.with(new Error('params.address is required'));
  });
});
