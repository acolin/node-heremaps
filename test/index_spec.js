import {expect} from 'chai';
import HereMapsAPI from '../lib/index';

describe('HereMapsAPI', () => {
  it('responds to geocode method', () => {
    expect(HereMapsAPI.prototype.geocode).to.be.a('function');
  });

  it('responds to matrixRouting method', () => {
    expect(HereMapsAPI.prototype.matrixRouting).to.be.a('function');
  });
});
