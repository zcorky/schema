
export const format = (pattern: string, map: Record<string, any>) => {
  return pattern.replace(/{([^}]+)}/g, (_, key) => {
    return typeof map[key] !== 'undefined' ? map[key] : '';
  });
}

export const assert = <T>(fn: (v: T) => boolean, message: string) => {
  return (path: string, value: T) => {
    if (!fn(value)) {
      throw new Error(format(message, { path }));
    }
  };
}
