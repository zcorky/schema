
import * as Types from '../../src';

describe('array', () => {
  const usersSchema = new Types.array(new Types.object({
    id: new Types.string().required(),
    username: new Types.string().required(),
    nickname: new Types.string().required(),
  }));

  it('should works', () => {
    expect(Types.validate(usersSchema, [{ id: '1', username: 'zero', nickname: 'Zero' }])).toBeTruthy();
    expect(Types.validate(usersSchema, [{ id: '1', username: 'zero', nickname: 'Zero' }])).toEqual([{ id: '1', username: 'zero', nickname: 'Zero' }]);
  });

  it('type array', () => {
    expect(() => Types.validate(usersSchema, null)).toThrowError(/root\s.*array/);
    expect(() => Types.validate(usersSchema, undefined)).toThrowError(/root\s.*array/);
    expect(() => Types.validate(usersSchema, 1)).toThrowError(/root\s.*array/);
    expect(() => Types.validate(usersSchema, '1')).toThrowError(/root\s.*array/);
    expect(() => Types.validate(usersSchema, false)).toThrowError(/root\s.*array/);
    expect(() => Types.validate(usersSchema, {})).toThrowError(/root\s.*array/);
  });

  it('child object', () => {
    expect(() => Types.validate(usersSchema, [undefined])).toThrowError(/object/);
    expect(() => Types.validate(usersSchema, [null])).toThrowError(/object/);
    expect(() => Types.validate(usersSchema, [1])).toThrowError(/object/);
  });

  it('child object primitive', () => {
    expect(() => Types.validate(usersSchema, [{ id: 1 }])).toThrowError(/id\s.*string/);
    expect(() => Types.validate(usersSchema, [{ id: '1' }])).toThrowError(/username\s.*required/);
  });
});
