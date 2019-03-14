
import * as Types from '../../src';

describe('string', () => {
  it('regex', () => {
    expect(() => Types.validate(new Types.string().regex(/\d+/), '1')).not.toThrow();
    expect(() => Types.validate(new Types.string().regex(/\d+/), 'abc')).toThrow(/root.*abc.*d+/);
  });

  it('min', () => {
    expect(() => Types.validate(new Types.string().min(6), '123456')).not.toThrow();
    expect(() => Types.validate(new Types.string().min(6), '123')).toThrow(/root.*at least.*6/);
  });

  it('max', () => {
    expect(() => Types.validate(new Types.string().max(6), '123456')).not.toThrow();
    expect(() => Types.validate(new Types.string().max(6), '1235678')).toThrow(/root.*less than or equal.*6/);
  });

  it('length', () => {
    expect(() => Types.validate(new Types.string().length(6), '123456')).not.toThrow();
    expect(() => Types.validate(new Types.string().length(6), '1235')).toThrow(/root.*be 6/);
    expect(() => Types.validate(new Types.string().length(6), '1235678')).toThrow(/root.*be 6/);
  });
});
