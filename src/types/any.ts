import { Type } from '../core/type';

export default class extends Type<any> {
  constructor() {
    super();

    this.type();
  }

  public type() {
    return this;
  }
}
