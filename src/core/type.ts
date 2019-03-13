import { undef } from '@zcorky/is';
import { assert } from '../utils';

export interface IType<T> {
  required(): this;
  // default(value: T): this;
  // oneOf(...args: T[]): this;
}

export type IValidator<T> = (key: string, value: T) => void;

export abstract class Type<T> implements IType<T> {
  private defaultValue: T;
  protected validators: IValidator<any>[] = [];

  protected abstract type(): this;

  protected addValidator<V>(validator: IValidator<V>) {
    this.validators.push(validator);
  };

  protected headValidator<V>(validator: IValidator<V>) {
    this.validators.unshift(validator);
  };

  public required() {
    this.headValidator(assert(
      (v: any) => !undef(v),
      '{path} is required',
    ));

    return this;
  }

  // public default(value: T) {
  //   this.defaultValue = value;
  //   return this;
  // }

  public oneOf(...values: T[]) {
    this.addValidator(assert(
      (v: any) => values.some(e => e === v),
      `{path} is one of [${values.join(',')}]`,
    ));

    return this;
  }

  public validate(path: string, value: any) {
    this.validators.forEach(validator => {
      validator(path, value);
    });

    return value;
  }
}
