import { array } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class <T> extends Type<T> {
  constructor(private value: T) {
    super();
  }

  public type() {
    this.addValidator(assert(array, '[{name}] {path} should be array'));
    return this;
  }

  public getType() {
    return this.value;
  }
}
