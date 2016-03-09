import {expect} from 'chai';
import HereMapsAPI from '../lib/index';

describe('HereMapsAPI', () => {
  it('responds to geocode method', () => {
    expect(HereMapsAPI.prototype.geocode).to.be.a('function');
  });
});
