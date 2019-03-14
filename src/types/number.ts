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

  public min(limit: number) {
    this.addValidator(assert(
      (v: number) => v >= limit,
      `{path} with value "{value}" must be greater than or equal to ${limit}`,
    ));
    return this;
  }

   public max(limit: number) {
    this.addValidator(assert(
      (v: number) => v <= limit,
      `{path} with value "{value}" must be less than or equal to ${limit}`,
    ));
    return this;
  }

  public greater(limit: number) {
    this.addValidator(assert(
      (v: number) => v > limit,
      `{path} with value "{value}" must be greater than ${limit}`,
    ));
    return this;
  }

   public less(limit: number) {
    this.addValidator(assert(
      (v: number) => v < limit,
      `{path} with value "{value}" must be less than ${limit}`,
    ));
    return this;
  }
}
