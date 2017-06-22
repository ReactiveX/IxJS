import { AsyncIterableX } from '../../asynciterable';
import { map } from '../../asynciterable/map';

/**
 * @ignore
 */
export function mapProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
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