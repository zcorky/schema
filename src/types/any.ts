import { Type } from '../core/type';

export default class extends Type<any> {
  constructor() {
    super();
  }

  public type() {
    return this;
  }
}
