import { format } from '@zodash/format';

export const assert = <T>(fn: (v: T) => boolean, message: string) => {
  return (path: string, value: T) => {
    if (!fn(value)) {
      throw new Error(format(message, { path, value }));
    }
  };
}
