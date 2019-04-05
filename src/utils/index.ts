import { DEFAULT_OPTIONS } from './../core/constants';
import { format } from '@zodash/format';

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

      const error = new Error(msg);
      // error.detail = {}
      // error.options = options;

      throw error;
    }
  };
}
