import Objectx, { IObject } from '../types/object';

export function compose<T extends object>(...types: IObject<any>[]) {
  const entities = types.reduce((all, type) => {
    return Object.assign(all, type.entity());
  }, {});

  return new Objectx(entities as T);
}
