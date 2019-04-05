import { DEFAULT_OPTIONS } from './../core/constants';
import { format } from '@zodash/format';
import { ValidationError } from './error';

import { IOptions } from '../core/interface';

export const assert = <T>(fn: (v: T) => boolean, message: string) => {
  return (path: string, value: T, options: IOptions) => {
    if (!fn(value)) {
      const name = options && options.name || DEFAULT_OPTIONS.name;

      const msg = format(message, {
        ...options,
        name,
        path,
        value,
      });

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
