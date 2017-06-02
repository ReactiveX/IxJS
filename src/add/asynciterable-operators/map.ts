import { AsyncIterableX } from '../../asynciterable';
import { map } from '../../asynciterable/map';

export function mapProto<TSource, TResult>(
    this: AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => Promise<TResult> | TResult,
    thisArg?: any): AsyncIterableX<TResult> {
  return map<TSource, TResult>(this, selector, thisArg);
}

AsyncIterableX.prototype.map = mapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    map: typeof mapProto;
  }
}