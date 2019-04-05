import { format } from '@zodash/format';
import { ValidationError } from './error';

export const assert = <T>(fn: (v: T) => boolean, message: string) => {
  return (path: string, value: T) => {
    if (!fn(value)) {
      const msg = format(message, { path, value });

      const detail = {
        name: 'ValidationError',
        message: msg,
        path,
        value,
        // type,
        // label
        // _object
      };

      throw new ValidationError(msg, detail);
    }
  };
}
