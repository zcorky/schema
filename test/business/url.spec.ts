
import * as Types from '../../src';

describe('url', () => {
  it('http://moeover.com', () => {
    expect(() => Types.validate(new Types.string().url(), 'http://moeover.com')).not.toThrow();
  });

  it('https://moeover.com', () => {
    expect(() => Types.validate(new Types.string().url(), 'https://moeover.com')).not.toThrow();
  });

  it('https://moeover', () => {
    expect(() => Types.validate(new Types.string().url(), 'https://moeover')).not.toThrow();
  });

  it('moeover.com', () => {
    expect(() => Types.validate(new Types.string().url(), 'moeover.com')).toThrow(/url/);
  });

  it('http://example.com/yjIwzjEuMA==-b', () => {
    expect(() => Types.validate(new Types.string().url(), 'http://example.com/yjIwzjEuMA==-b')).not.toThrow();
  })
});
