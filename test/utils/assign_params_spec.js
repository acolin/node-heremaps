import {expect} from 'chai';
import assignParams from '../../lib/utils/assign_params';

describe('assignParams', () => {
  const acceptedKeys = {
    "paramOne": "string",
    "paramTwo": "array",
    "paramThree": "date",
    "paramFour": "boolean"
  };

  it('throws exception with acceptedKeys not being object', () => {
    let assign = () => assignParams({}, {}, null);

    expect(assign).to.throw(TypeError, /accepted keys must be an object/);
  });

  it('returns params when newParams is empty', () => {
    let params = {
      "paramOne": true
    };

    expect(assignParams(params, {}, acceptedKeys));
  });

  it('ommits unassigned keys', () => {
    let params = {
      "paramOne": 'string',
      "paramTwo": [1, 2]
    };
    let newParams = {
      "paramOne": 'hello'
    };
    const expected = {
      "paramOne": 'hello',
      "paramTwo": [1, 2]
    };

    expect(assignParams(params, newParams, acceptedKeys)).to.deep.equal(expected);
  });

  it('ommits invalid keys', () => {
    let params = {
      "paramOne": 'string',
      "paramTwo": [1, 2]
    };
    let newParams = {
      "paramOne": [1, 2]
    };

    expect(assignParams(params, newParams, acceptedKeys)).to.deep.equal(params);
  });

  it('assigns all valid types', () => {
    let params = {};
    let newParams = {
      "paramOne": "",
      "paramTwo": [1, 2],
      "paramThree": new Date(),
      "paramFour": false
    };

    expect(assignParams(params, newParams, acceptedKeys)).to.deep.equal(newParams);
  });
});
