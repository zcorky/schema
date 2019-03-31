
import * as Types from '../../src';

describe('email', () => {
  it('tobewhatwewant@gmail.com', () => {
    expect(() => Types.validate(new Types.string().email(), 'tobewhatwewant@gmail.com')).not.toThrow();
  });

  it('tobewhatwewant@gmail.com.cn', () => {
    expect(() => Types.validate(new Types.string().email(), 'tobewhatwewant@gmail.com.cn')).not.toThrow();
  });

  it('tobewhatwewant', () => {
    expect(() => Types.validate(new Types.string().email(), 'tobewhatwewant')).toThrow(/email/);
  });

  it('tobewhatwewant@gmail', () => {
    expect(() => Types.validate(new Types.string().email(), 'tobewhatwewant@gmail')).toThrow(/email/);
  });
});
