import { string } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class extends Type<string> {
  constructor() {
    super();

    this.type();
  }

  public type() {
    this.addValidator(assert(string, '{path} should be string'));
    return this;
  }

  public regex(re: RegExp, message?: string) {
    this.addValidator(assert(
      (v: string) => re.test(v),
      string(message) ? message : `{path} with value "{value}" fails to match pattern: ${re.toString()}`,
    ));
    return this;
  }
}
