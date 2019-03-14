import * as Types from '../../src';

describe('number', () => {
  it('min', () => {
    expect(() => Types.validate(new Types.number().min(100), 99)).toThrow(/root with value "99" must be greater than or equal to 100/);
    expect(() => Types.validate(new Types.number().min(100), 100)).not.toThrow();
    expect(() => Types.validate(new Types.number().min(100), 101)).not.toThrow();
  });

  it('max', () => {
    expect(() => Types.validate(new Types.number().max(100), 99)).not.toThrow();
    expect(() => Types.validate(new Types.number().max(100), 100)).not.toThrow();
    expect(() => Types.validate(new Types.number().max(100), 101)).toThrow(/root with value "101" must be less than or equal to 100/);
  });

  it('greater', () => {
    expect(() => Types.validate(new Types.number().greater(100), 99)).toThrow(/root with value "99" must be greater than 100/);
    expect(() => Types.validate(new Types.number().greater(100), 100)).toThrow(/root with value "100" must be greater than 100/);
    expect(() => Types.validate(new Types.number().greater(100), 101)).not.toThrow();
  });

  it('less', () => {
    expect(() => Types.validate(new Types.number().less(100), 99)).not.toThrow();
    expect(() => Types.validate(new Types.number().less(100), 100)).toThrow(/root with value "100" must be less than 100/);
    expect(() => Types.validate(new Types.number().less(100), 101)).toThrow(/root with value "101" must be less than 100/);
  });
});
