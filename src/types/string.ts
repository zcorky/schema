import { string } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class extends Type<string> {
  constructor() {
    super();

    this.type();
  }

  public type() {
    this.addValidator(assert(string, '{key} should be string'));
    return this;
  }
}
