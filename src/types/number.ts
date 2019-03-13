import { number } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class extends Type<number> {
  constructor() {
    super();

    this.type();
  }

  public type() {
    this.addValidator(assert(number, '{path} should be number'));
    return this;
  }
}
