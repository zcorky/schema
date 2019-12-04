import * as Types from '../src';

describe('optional', () => {
  // it('any', () => {
  //   expect(Types.validate(new Types.any().toValue(), null)).toEqual(null)
  // });

  it('string', () => {
    expect(Types.validate(new Types.string().toValue(), 'zero')).toBe('zero');
    expect(Types.validate(new Types.string().toValue((origin) => `name:${origin}`), 'zero')).toBe('name:zero');
  });

  it('number', () => {
    expect(Types.validate(new Types.number().toValue(), 1)).toBe(1);
    expect(Types.validate(new Types.number().toValue(origin => origin + 1), 1)).toBe(2);
  });

  it('boolean', () => {
    expect(Types.validate(new Types.boolean().toValue(), true)).toBe(true);
    expect(Types.validate(new Types.boolean().toValue(() => false), true)).toBe(false);
  });

  it('object', () => {
    expect(Types.validate(new Types.object({}).toValue(), {})).toEqual({});
    // expect(Types.validate(new Types.object({}).toValue(() => false), {})).toEqual(false);
  });

  it('array', () => {
    expect(Types.validate(new Types.array(new Types.object({})).toValue(), [{}])).toEqual([{}]);
    // expect(Types.validate(new Types.array(new Types.object({})).toValue(origin => (origin as any).map((_, i) => i)), [{}])).toEqual([0]);
  });

  it('comple object', () => {
    const schema = new Types.object({
      id: new Types.string().required().toValue(),
    }).toValue();

    expect(Types.validate(schema, { id: '666' })).toEqual({ id: '666' });
  });
});
