import { format } from '../../src/utils';

describe('utils', () => {
  it('format string', () => {
    expect(format('xxx', {})).toBe('xxx');
    expect(format('{key} xxx', { key: 'A' })).toBe('A xxx');
    expect(format('{key} xxx', { })).toBe(' xxx');
  });
});
