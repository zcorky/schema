import { undef as isUndefined } from '@zcorky/is';
import { assert } from '../utils';

export interface IType<T> {
  required(): this;
  // default(value: T): this;
  // oneOf(...args: T[]): this;
}

export type IValidator<T> = (key: string, value: T) => void;

export abstract class Type<T> implements IType<T> {
  private meta = {
    required: false,
    default: undefined as any as T,
  };
  protected validators: IValidator<any>[] = [];

  // @TODO should private
  public getMeta(name: string): boolean {
    if (!this.meta.hasOwnProperty(name)) {
      throw new Error('Illegal call is with name: ' + name);
    }
    
    return this.meta[name];
  }

  protected abstract type(): this;

  protected addValidator<V>(validator: IValidator<V>) {
    this.validators.push(validator);
  };

  protected headValidator<V>(validator: IValidator<V>) {
    this.validators.unshift(validator);
  };

  public required() {
    this.meta.required = true;

    this.headValidator(assert(
      (v: any) => !isUndefined(v),
      '{path} is required',
    ));

    return this;
  }

  public default(value: T) {
    this.meta.default = value;
    return this;
  }

  public optional() {
    this.meta.required = false;

    return this;
  }

  public oneOf(values: T[]) {
    this.addValidator(assert(
      (v: any) => values.some(e => e === v),
      `{path} is one of [${values.join(',')}]`,
    ));

    return this;
  }

  public enum(values: T[]) {
    return this.oneOf(values);
  }

  public validate(path: string, value: any) {
    this.validators.forEach(validator => {
      validator(path, value);
    });

    return value;
  }
}
