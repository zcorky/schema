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

export function validate<S extends ISchema, V>(schema: S, value: V, key: any = 'root') {
  // primitive
  if (oneOf(schema, [Types.string, Types.number, Types.boolean])) {
    return schema.validate(key, value);
  }

  // object
  if (schemaOf(schema, Types.object)) {
    const v = schema.validate(key, value);

    const o = (schema as any as Types.object<any>);
    return o
      .keys()
      .reduce((prev, k) => (prev[k] = validate(o.get(k), v[k], k), prev), {});
  }

  // array
  if (schemaOf(schema, Types.array)) {
    const v = schema.validate(key, value) as any[];
    const o = (schema as any as Types.array<any>);
    const s = o.getType();
    return v.map(ev => validate(s, ev));
  }
}
