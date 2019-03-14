import * as Types from '../src';

describe('default', () => {
  it('string', () => {
    expect(Types.validate(new Types.string(), undefined)).toBe(undefined);
    expect(Types.validate(new Types.string().default('man'), undefined)).toBe('man');
  });

  it('number', () => {
    expect(Types.validate(new Types.number(), undefined)).toBe(undefined);
    expect(Types.validate(new Types.number().default(1), undefined)).toBe(1);
  });

  it('boolean', () => {
    expect(Types.validate(new Types.boolean(), undefined)).toBe(undefined);
    expect(Types.validate(new Types.boolean().default(true), undefined)).toBe(true);
  });

  it('object', () => {
    expect(Types.validate(new Types.object({ active: new Types.boolean() }), {})).toEqual({});
    expect(Types.validate(new Types.object({ active: new Types.boolean().default(true) }), {})).toEqual({ active: true });
  });

  // it('array', () => {
  //   expect(() => Types.validate(new Types.array({}).required(), undefined)).toThrow(/required/);
  //   expect(() => Types.validate(new Types.array({}), undefined)).not.toThrow(/required/);
  // });
});
