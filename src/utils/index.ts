import { format } from '@zodash/format';
import { ValidationError } from './error';

export const assert = <T>(fn: (v: T) => boolean, message: string) => {
  return (path: string, value: T) => {
    if (!fn(value)) {
      throw new ValidationError(format(message, { path, value }));
    }
  };
}
