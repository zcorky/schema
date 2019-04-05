import { object } from '@zcorky/is';

import { Type, IType } from '../core/type';
import { assert } from '../utils';

export interface IObject<T extends object> extends IType<T> {
  entity(): T;
}

class Objectx<T extends object> extends Type<T> implements IObject<T> {
  constructor(private value: T) {
    super();

    this.type();
  }

  public type() {
    this.addValidator(assert(object, '[{name}] {path} should be object'));
    return this;
  }

  public keys() {
    return Object.keys(this.value);
  }

  public get(key: string) {
    return this.value[key];
  }

  public entity() {
    return this.value;
  }
}

export default Objectx;
