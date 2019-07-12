import * as Types from '../src';

describe('optional', () => {
  it('any', () => {
    expect(() => Types.validate(new Types.any().nullable(), null)).not.toThrow();
  });

  it('string', () => {
    expect(() => Types.validate(new Types.string().nullable(), null)).not.toThrow();
  });

  it('number', () => {
    expect(() => Types.validate(new Types.number().nullable(), null)).not.toThrow();
  });

  it('boolean', () => {
    expect(() => Types.validate(new Types.boolean().nullable(), null)).not.toThrow();
  });

  it('object', () => {
    expect(() => Types.validate(new Types.object({}).nullable(), null)).not.toThrow();
  });


  it('array', () => {
    expect(() => Types.validate(new Types.array({}).nullable(), null)).not.toThrow();
  });
});
