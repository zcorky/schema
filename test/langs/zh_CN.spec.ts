import * as Types from '../../src';
import zh_CN from '../../src/langs/zh_CN';
import en_US from '../../src/langs/en_US';

describe('locale', () => {
  beforeAll(() => {
    Types.locale.set(zh_CN);
  });

  afterAll(() => {
    Types.locale.set(en_US);
  });

  it('string', () => {
    expect(Types.validate(new Types.string().required(), 1)).toBe(1);
  });

  // it('number', () => {
  //   expect(Types.validate(new Types.number(), undefined)).toBe(undefined);
  //   expect(Types.validate(new Types.number().default(1), undefined)).toBe(1);
  // });

  // it('boolean', () => {
  //   expect(Types.validate(new Types.boolean(), undefined)).toBe(undefined);
  //   expect(Types.validate(new Types.boolean().default(true), undefined)).toBe(true);
  // });

  // it('object', () => {
  //   expect(Types.validate(new Types.object({ active: new Types.boolean() }), {})).toEqual({});
  //   expect(Types.validate(new Types.object({ active: new Types.boolean().default(true) }), {})).toEqual({ active: true });
  // });

  // it('array', () => {
  //   expect(() => Types.validate(new Types.array({}).required(), undefined)).toThrow(/required/);
  //   expect(() => Types.validate(new Types.array({}), undefined)).not.toThrow(/required/);
  // });
});
