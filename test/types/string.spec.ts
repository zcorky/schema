
import * as Types from '../../src';

describe('string', () => {
  it('regex', () => {
    expect(() => Types.validate(new Types.string().regex(/\d+/), '1')).not.toThrow();
    expect(() => Types.validate(new Types.string().regex(/\d+/), 'abc')).toThrow(/root.*abc.*d+/);
  });
});
