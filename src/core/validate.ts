import { undef as isUndefined } from '@zcorky/is';

import { IOptions } from './interface';
import { Type } from './type';
import { DEFAULT_OPTIONS } from './constants';

import * as Types from '../types';

export type ISchema = Type<object>
  | Type<string>
  | Type<number>
  | Type<boolean>
  | Type<any[]>;

export type IObject = typeof Types.object
  | typeof Types.string
  | typeof Types.number
  | typeof Types.boolean
  | typeof Types.array;

const schemaOf = (schema: ISchema, type: IObject) => schema instanceof type;

const oneOf = (schema: ISchema, types: IObject[]) => {
  return types.some((t) => schemaOf(schema, t));
}

export function validate<S extends ISchema, V>(schema: S, value: V, options?: IOptions) {
  const path = options && options.path || DEFAULT_OPTIONS.path;

  if (isUndefined(value)) {
    if (!isUndefined(schema.getMeta('default'))) { // default
      return schema.getMeta('default');
    }

    if (!schema.getMeta('required')) { // optional
      return value;
    }
  }

  // primitive
  if (oneOf(schema, [Types.string, Types.number, Types.boolean])) {
    return schema.validate(path, value, options);
  }

  // object
  if (schemaOf(schema, Types.object)) {
    const v = schema.validate(path, value, options);

    const o = (schema as any as Types.object<any>);
    return o
      .keys()
      .reduce((prev, key) => {
        const nextPath = `${path}.${key}`;
        const notUndefinedValue = validate(o.get(key), v[key], {
          ...options,
          path: nextPath,
        });

        // ignore undefined, whatever key not in value
        //  or key in value, but value[key] is undefined
        if (!isUndefined(notUndefinedValue)) {
          prev[key] = notUndefinedValue;
        }

        return prev;
      }, {});
  }

  // array
  if (schemaOf(schema, Types.array)) {
    const v = schema.validate(path, value, options) as any[];

    const o = (schema as any as Types.array<any>);
    const s = o.getType();

    if (schema.getMeta('nullable') && v === null) {
      return null;
    }

    return v.map((ev, index) => {
      const nextPath = `${path}.${index}`;
      return validate(s, ev, {
        ...options,
        path: nextPath,
      });
    });
  }
}
