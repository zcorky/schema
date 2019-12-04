import { undef as isUndefined } from '@zcorky/is';
import { IOptions } from './interface';
import { assert } from '../utils';

export interface IType<T> {
  required(): this;
  optional(): this;
  default(value: T): this;
  oneOf(values: T[]): this;
  enum(values: T[]): this;
}

export type IValidator<T> = (key: string, value: T, options?: IOptions) => void;

export abstract class Type<T> implements IType<T> {
  private meta = {
    required: false,
    nullable: false,
    default: undefined as any as T,
    transform: (origin: any) => origin,
  };
  protected validators: IValidator<any>[] = [];

  protected abstract type(): this;

  constructor() {
    this.type();
  }

  // @TODO should private
  public getMeta(name: string): boolean {
    if (!this.meta.hasOwnProperty(name)) {
      throw new Error('Illegal call is with name: ' + name);
    }

    return this.meta[name];
  }

  protected addValidator<V>(validator: IValidator<V>) {
    this.validators.push(validator);
  };

  protected headValidator<V>(validator: IValidator<V>) {
    this.validators.unshift(validator);
  };

  public required() {
    this.meta.required = true;
    this.meta.nullable = false;

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
    this.meta.nullable = true;

    return this;
  }

  public nullable() {
    return this.optional();
  }

  public oneOf(values: T[]) {
    this.addValidator(assert(
      (v: any) => values.some(e => e === v),
      `[{name}] {path} is one of [${values.join(',')}]`,
    ));

    return this;
  }

  public enum(values: T[]) {
    return this.oneOf(values);
  }

  public validate(path: string, value: any, options?: IOptions) {
    if (this.meta.nullable && value === null) {
      return null;
    }

    this.validators.forEach(validator => {
      validator(path, value, options);
    });

    return this.meta.transform(value);
  }

  public toValue(transform?: (origin: T) => any) {
    if (typeof transform !== 'function') {
      return this;
    }

    this.meta.transform = transform;
    return this;
  }
}
