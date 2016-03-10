import {expect} from 'chai';
import assignParams from '../../lib/utils/assign_params';

describe('assignParams', () => {
  const acceptedKeys = {
    paramOne: "string",
    paramTwo: "array",
    paramThree: "date",
    paramFour: "boolean"
  };

  it('throws exception with acceptedKeys not being object', () => {
    const assign = () => assignParams({}, {}, null);

    expect(assign).to.throw(TypeError, /accepted keys must be an object/);
  });

  it('returns params when newParams is empty', () => {
    const params = {
      paramOne: true
    };

    expect(assignParams(params, {}, acceptedKeys));
  });

  it('ommits unassigned keys', () => {
    const params = {
      paramOne: 'string',
      paramTwo: [1, 2]
    };
    const newParams = {
      paramOne: 'hello'
    };
    const expected = {
      paramOne: 'hello',
      paramTwo: [1, 2]
    };

    expect(assignParams(params, newParams, acceptedKeys)).to.deep.equal(expected);
  });

  it('ommits invalid keys', () => {
    const params = {
      paramOne: 'string',
      paramTwo: [1, 2]
    };
    const newParams = {
      paramOne: [1, 2]
    };

    expect(assignParams(params, newParams, acceptedKeys)).to.deep.equal(params);
  });

  it('assigns all valid types', () => {
    const params = {};
    const newParams = {
      paramOne: "",
      paramTwo: [1, 2],
      paramThree: new Date(),
      paramFour: false
    };

    expect(assignParams(params, newParams, acceptedKeys)).to.deep.equal(newParams);
  });
});
