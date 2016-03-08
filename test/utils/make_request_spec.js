import {expect} from 'chai';
import makeRequest from '../../lib/utils/make_request';

describe('makeRequest', () => {
  it('throws an error with invalid credentials', () => {
    const request = () => makeRequest({}, {}, {}, {}, '');

    expect(request).to.throw(Error, /You must provide app_id and app_code credentials./);
  });

  it('returns url when callback is not a function', () => {
    const expectedURL = "https://geocoder.api.here.com/6.2/geocode.json?searchtext=garza%20sada%201000%2C%20monterrey%2C%20nl&app_id=abc&app_code=def&gen=8";
    const params = [
      '',
      {
        app_id: 'abc',
        app_code: 'def',
        gen: '8',
        version: '6.2'
      },
      {
        searchtext: 'garza sada 1000, monterrey, nl'
      },
      {
        subdomain: 'geocoder',
        path: 'geocode.json'
      },
      ''
    ];

    expect(makeRequest(...params)).to.equal(expectedURL);
  });
});
