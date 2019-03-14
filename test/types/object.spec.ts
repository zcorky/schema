
import * as Types from '../../src';

describe('object', () => {
  const userSchema = new Types.object({
    id: new Types.number().required(),
    username: new Types.string().required(),
    nickname: new Types.string().required(),
  }).required();

  it('should works', () => {
    expect(Types.validate(userSchema, { id: 1, username: 'zero', nickname: 'Zero' })).toBeTruthy();
    expect(Types.validate(userSchema, { id: 1, username: 'zero', nickname: 'Zero' })).toEqual({ id: 1, username: 'zero', nickname: 'Zero' });
  });

  it('object with string', () => {
    const schema = new Types.object({
      id: new Types.string(),
    });
    expect(Types.validate(schema, { id: '0x1' })).toEqual({ id: '0x1'});
    expect(() => Types.validate(schema, 1)).toThrowError(/root\s.*object/);
    expect(() => Types.validate(schema, true)).toThrowError(/object/);
    expect(() => Types.validate(schema, {})).not.toThrowError(/id\s.*string/);
  });
});
