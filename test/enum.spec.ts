import * as Types from '../src';

describe('enum', () => {
  it('string', () => {
    expect(() => Types.validate(new Types.string().enum(['male', 'female']).required(), undefined)).toThrow(/required/);
    expect(() => Types.validate(new Types.string().enum(['male', 'female']).required(), 'males')).toThrow(/one of/);
    expect(() => Types.validate(new Types.string().enum(['male', 'female']).required(), 'male')).not.toThrow();
  });

  it('number', () => {
    expect(() => Types.validate(new Types.number().enum([0, 1]).required(), undefined)).toThrow(/required/);
    expect(() => Types.validate(new Types.number().enum([0, 1]).required(), 2)).toThrow(/one of/);
    expect(() => Types.validate(new Types.number().enum([0, 1]).required(), 0)).not.toThrow();
  });

  it('boolean', () => {
    expect(() => Types.validate(new Types.boolean().enum([true, false]).required(), undefined)).toThrow(/required/);
    expect(() => Types.validate(new Types.boolean().enum([true, false]).required(), false)).not.toThrow();
    expect(() => Types.validate(new Types.boolean().enum([true, false]).required(), true)).not.toThrow();
  });

  it('complex object', () => {
    const post = new Types.object({
      id: new Types.string().required(),
      title: new Types.string().required(),
      description: new Types.string(),
      content: new Types.string().required(),
      category: new Types.string().enum(['cat1', 'cat2']).required(),
      comments: new Types.array(new Types.object({
        id: new Types.string().required(),
        user: new Types.object({
          id: new Types.string().required(),
          nickname: new Types.string().required(),
          createdAt: new Types.string().required(),
        }).required(),
      }).required()).required(),
    }).required();

    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx' })).toThrow(/root.category\s.*required/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', category: 'cat3' })).toThrow(/root.category\s.*one of \[cat1,cat2\]/);
    expect(() => Types.validate(post, { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', category: 'cat1' })).toThrow(/root.comments\s.*required/);
  });
});
