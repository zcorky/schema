import * as Types from '../src';

describe('error', () => {
  it('string', () => {
    expect(() => Types.validate(new Types.string().required(), undefined)).toThrow(Types.ValidationError);
  });

  it('number', () => {
    expect(() => Types.validate(new Types.number().required(), undefined)).toThrow(Types.ValidationError);
  });

  it('boolean', () => {
    expect(() => Types.validate(new Types.boolean().required(), undefined)).toThrow(Types.ValidationError);
  });

  it('object', () => {
    expect(() => Types.validate(new Types.object({}).required(), undefined)).toThrow(Types.ValidationError);
  });

  it('array', () => {
    expect(() => Types.validate(new Types.array({}).required(), undefined)).toThrow(Types.ValidationError);
  });

  it('complex 1', () => {
    const post = new Types.object({
      id: new Types.string().required(),
      title: new Types.string().required(),
      description: new Types.string(),
      content: new Types.string().required(),
      comments: new Types.array(new Types.object({
        id: new Types.string().required(),
        user: new Types.object({
          id: new Types.string().required(),
          nickname: new Types.string().required(),
          createdAt: new Types.string().required(),
        }).required(),
      }).required()).required(),
    }).required();

    expect(() => Types.validate(post, undefined)).toThrow(/root\s.*required/);
    expect(() => Types.validate(post, {})).toThrow(/id\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx' })).toThrow(/title\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx' })).toThrow(/root.content\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx' })).toThrow(/content\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx' })).toThrow(/comments\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', comments: [] })).not.toThrow();
    // @TODO nest path
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', comments: [undefined] })).toThrow(/root\.comments.0\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', comments: [{}] })).toThrow(/root.comments.0.id\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', comments: [{ id: 'xxx' }] })).toThrow(/root.comments.0.user\s.*required/);
  });
});
