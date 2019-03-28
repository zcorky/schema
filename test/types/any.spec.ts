
import * as Types from '../../src';

describe('any', () => {
  it('type', () => {
    const input = { x: 1, y: 2 };
    const output = {};

    expect(() => Types.validate(new Types.any(), input)).not.toThrow();
    expect(() => Types.validate(new Types.any(), output)).not.toThrow();
  });

  it('object', () => {
    const input = { x: 1, y: 2 };
    const output = {};

    expect(() => Types.validate(new Types.any(), input)).not.toThrow();
    expect(() => Types.validate(new Types.any(), output)).not.toThrow();
  });

  it('array', () => {
    const input = [{ x: 1, y: 2 }];
    const output = [{}];

    expect(() => Types.validate(new Types.any(), input)).not.toThrow();
    expect(() => Types.validate(new Types.any(), output)).not.toThrow();
  });

  it('string', () => {
    const input = 'x';
    const output = '';

    expect(() => Types.validate(new Types.any(), input)).not.toThrow();
    expect(() => Types.validate(new Types.any(), output)).not.toThrow();
  });

  it('number', () => {
    const input = 1;
    const output = 2;

    expect(() => Types.validate(new Types.any(), input)).not.toThrow();
    expect(() => Types.validate(new Types.any(), output)).not.toThrow();
  });

  it('boolean', () => {
    const input = true;
    const output = false;

    expect(() => Types.validate(new Types.any(), input)).not.toThrow();
    expect(() => Types.validate(new Types.any(), output)).not.toThrow();
  });
});
