import { undef as isUndefined } from '@zcorky/is';
import { Type } from './type';
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

export function validate<S extends ISchema, V>(schema: S, value: V, path: any = 'root') {
  if (isUndefined(value) && !schema.is('required')) {
    return value;
  }

  // primitive
  if (oneOf(schema, [Types.string, Types.number, Types.boolean])) {
    return schema.validate(path, value);
  }

  // object
  if (schemaOf(schema, Types.object)) {
    const v = schema.validate(path, value);

    const o = (schema as any as Types.object<any>);
    return o
      .keys()
      .reduce((prev, key) => {
        const nextPath = `${path}.${key}`;
        prev[key] = validate(o.get(key), v[key], nextPath);
        return prev;
      }, {});
  }

  // array
  if (schemaOf(schema, Types.array)) {
    const v = schema.validate(path, value) as any[];

    const o = (schema as any as Types.array<any>);
    const s = o.getType();
    return v.map((ev, index) => {
      const nextPath = `${path}.${index}`;
      return validate(s, ev, nextPath);
    });
  }
}
