import * as Types from '../../src';

describe('compose', () => {
  it('one', () => {
    expect(() => Types.validate(Types.compose(new Types.object({}).required()).required(), undefined)).toThrow(/required/);
  });

  it('more', () => {
    const id = new Types.object({
      id: new Types.string().required(),
    }).required();

    const user = new Types.object({
      name: new Types.string().required(),
      age: new Types.number().required(),
    });

    // const composed = Types.compose(id, user);

    expect(() => Types.validate(Types.compose(id, user), {})).toThrow(/id/);
    expect(() => Types.validate(Types.compose(id, user), { id: 'x' })).toThrow(/name/);
    expect(() => Types.validate(Types.compose(id, user), { id: 'x', name: 'zero' })).toThrow(/age/);
    expect(() => Types.validate(Types.compose(id, user), { id: 'x', name: 'zero', age: 18 })).not.toThrow();
  });
});
