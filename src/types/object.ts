import { object } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class <T extends object> extends Type<T> {
  constructor(private value: T) {
    super();

    this.type();
  }

  public type() {
    this.addValidator(assert(object, '{path} should be object'));
    return this;
  }

  public keys() {
    return Object.keys(this.value);
  }

  public get(key: string) {
    return this.value[key];
  }
}
