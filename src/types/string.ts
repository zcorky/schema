import { string, date } from '@zcorky/is';

import { Type } from '../core/type';
import { assert } from '../utils';

export default class extends Type<string> {
  constructor() {
    super();
  }

  public type() {
    this.addValidator(assert(string, '[{name}] {path} should be string'));
    return this;
  }

  public regex(re: RegExp, message?: string) {
    this.addValidator(assert(
      (v: string) => re.test(v),
      string(message) ? String(message) : `[{name}] {path} with value "{value}" fails to match pattern: ${re.toString()}`,
    ));
    return this;
  }

  public min(limit: number) {
    this.addValidator(assert(
      (v: string) => v.length >= limit,
      `[{name}] {path} with value "{value}" length must be at least ${limit} characters long`,
    ));
    return this;
  }

  public max(limit: number) {
    this.addValidator(assert(
      (v: string) => v.length <= limit,
      `[{name}] {path} with value "{value}" length must be less than or equal to ${limit} characters long`,
    ));
    return this;
  }

  public length(limit: number) {
    this.addValidator(assert(
      (v: string) => v.length === limit,
      `[{name}] {path} with value "{value}" length must be ${limit} characters long`,
    ));
    return this;
  }

  // functional
  public date() {
    this.addValidator(assert(
      (v: string) => date(v),
      `[{name}] {path} with value "{value}" must be a date`,
    ));
    return this;
  }

  public email() {
    this.addValidator(assert(
      (v: string) => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(v),
      `[{name}] {path} with value "{value}" must be a email`,
    ));
    return this;
  }

  public url() {
    this.addValidator(assert(
      (v: string) => /^https?:\/\//i.test(v),
      `[{name}] {path} with value "{value}" must be a url`,
    ));
    return this;
  }
}
