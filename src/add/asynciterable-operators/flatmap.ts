import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { flatMap } from '../../asynciterable/operators/flatmap';

/**
 * @ignore
 */
export function flatMapProto<T, R>(
  this: AsyncIterableX<T>,
  selector: (value: T) => AsyncIterable<R> | Promise<AsyncIterable<R>>,
  thisArg?: any
): AsyncIterableX<R> {
  return flatMap<T, R>(selector, thisArg)(this);
}

AsyncIterableX.prototype.flatMap = flatMapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}
