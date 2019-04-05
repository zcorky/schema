import { ValidationError } from '../../src/utils/error';

describe('error', () => {
  it('validation error', () => {
    expect(new ValidationError('xxx') instanceof ValidationError).toBeTruthy();
  });
});
