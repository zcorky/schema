
import * as Types from '../../src';

describe('primitive', () => {
  it('string', () => {
    const schema = new Types.string();
    expect(Types.validate(schema, '1')).toEqual('1');
    expect(() => Types.validate(schema, 1)).toThrowError(/string/);
    expect(() => Types.validate(schema, true)).toThrowError(/string/);
    expect(() => Types.validate(schema, {})).toThrowError(/string/);
  });

  it('number', () => {
    const schema = new Types.number();
    expect(Types.validate(schema, 1)).toEqual(1);
    expect(() => Types.validate(schema, '1')).toThrowError(/number/);
    expect(() => Types.validate(schema, true)).toThrowError(/number/);
    expect(() => Types.validate(schema, {})).toThrowError(/number/);
  });

  it('boolean', () => {
    const schema = new Types.boolean();
    expect(Types.validate(schema, true)).toEqual(true);
    expect(() => Types.validate(schema, '1')).toThrowError(/boolean/);
    expect(() => Types.validate(schema, 1)).toThrowError(/boolean/);
    expect(() => Types.validate(schema, {})).toThrowError(/boolean/);
  });
});
