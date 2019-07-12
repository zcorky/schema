import { boolean } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class extends Type<boolean> {
  constructor() {
    super();
  }

  public type() {
    this.addValidator(assert(boolean, '[{name}] {path} should be boolean'));
    return this;
  }
}
