import * as Types from '../../src';

describe('named', () => {
  const id = new Types.object({
    id: new Types.string().required(),
  }).required();

  const entity = new Types.object({
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

  const getPost = {
    input: id,
    output: Types.compose(id, entity).required(),
  };

  it('default', () => {
    const input = {
      id: 123,
    };
    expect(() => Types.validate(getPost.input, input)).toThrow(/\[api\] root.id\s.*string/);

    // const res = {
    //   data: { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', category: 'cat3' },
    // };

    // const output = res.data;
    // expect(() => Types.validate(getPost.output, output)).toThrow(/root.category\s.*one of \[cat1,cat2\]/);
  });

  it('custom', () => {
    const input = {
      id: 123,
    };
    expect(() => Types.validate(getPost.input, input, {
      name: 'Get Post Request',
    })).toThrow(/\[Get Post Request] root.id\s.*string/);

    const res = {
      data: { id: 'xxx', title: 'xxx', description: 'xxx', content: 'xxx', category: 'cat3' },
    };

    const output = res.data;
    expect(() => Types.validate(getPost.output, output, {
      name: 'Get Post Response',
    })).toThrow(/\[Get Post Response] root.category\s.*one of \[cat1,cat2\]/);
  });
});
