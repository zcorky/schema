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

  public min(limit: number) {
    this.addValidator(assert(
      (v: string) => v.length >= limit,
      `{path} with value "{value}" length must be at least ${limit} characters long`,
    ));
    return this;
  }

  public max(limit: number) {
    this.addValidator(assert(
      (v: string) => v.length <= limit,
      `{path} with value "{value}" length must be less than or equal to ${limit} characters long`,
    ));
    return this;
  }

  public length(limit: number) {
    this.addValidator(assert(
      (v: string) => v.length === limit,
      `{path} with value "{value}" length must be ${limit} characters long`,
    ));
    return this;
  }
}
