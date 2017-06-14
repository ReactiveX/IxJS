import { AsyncIterableX } from '../../asynciterable';
import { filter } from '../../asynciterable/filter';

/**
 * @ignore
 */
export function filterProto<TSource>(
    this: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => Promise<boolean> | boolean,
    thisArg?: any): AsyncIterableX<TSource> {
  return filter<TSource>(this, predicate, thisArg);
}

AsyncIterableX.prototype.filter = filterProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    filter: typeof filterProto;
  }
}