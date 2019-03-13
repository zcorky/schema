
import * as Types from '../src';

describe('works', () => {
  const userSchema = new Types.object({
    id: new Types.number().required(),
    username: new Types.string().required(),
    nickname: new Types.string().required(),
  }).required();

  it('should works', () => {
    expect(Types.validate(userSchema, { id: 1, username: 'zero', nickname: 'Zero' })).toBeTruthy();
    expect(Types.validate(userSchema, { id: 1, username: 'zero', nickname: 'Zero' })).toEqual({ id: 1, username: 'zero', nickname: 'Zero' });
  });
});
