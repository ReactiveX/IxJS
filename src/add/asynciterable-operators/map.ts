import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { MapAsyncIterable } from '../../asynciterable/operators/map';

/**
 * @ignore
 */
export function mapProto<T, R>(
  this: AsyncIterableX<T>,
  selector: (value: T, index: number, signal?: AbortSignal) => Promise<R> | R,
  thisArg?: any
): AsyncIterableX<R> {
  return new MapAsyncIterable(this, selector, thisArg);
}

AsyncIterableX.prototype.map = mapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    map: typeof mapProto;
  }
}
