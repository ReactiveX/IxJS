import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { SliceAsyncIterable } from '../../asynciterable/operators/slice.js';

/**
 * @ignore
 */
export function sliceProto<T>(
  this: AsyncIterableX<T>,
  begin: number,
  end: number
): AsyncIterableX<T> {
  return new SliceAsyncIterable<T>(this, begin, end);
}

AsyncIterableX.prototype.slice = sliceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    slice: typeof sliceProto;
  }
}
