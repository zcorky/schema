
import * as Types from '../../src';

describe('date', () => {
  it('2019-03-31', () => {
    expect(() => Types.validate(new Types.string().date(), '2019-03-31')).not.toThrow();
  });

  it('2019/03/31', () => {
    expect(() => Types.validate(new Types.string().date(), '2019/03/31')).not.toThrow();
  });

  it('03/31/2019', () => {
    expect(() => Types.validate(new Types.string().date(), '03/31/2019')).not.toThrow();
  });

  it('20190331', () => {
    expect(() => Types.validate(new Types.string().date(), '20190331')).toThrow(/date/);
  });

  it('201903311', () => {
    expect(() => Types.validate(new Types.string().date(), '201903311')).toThrow(/date/);
  });
});
