import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { flatMap } from '../../asynciterable/operators/flatmap.js';
import { FlattenConcurrentSelector } from '../../asynciterable/operators/_flatten.js';

/**
 * @ignore
 */
export function flatMapProto<T, R>(
  this: AsyncIterableX<T>,
  selector: FlattenConcurrentSelector<T, R>,
  concurrent = Infinity,
  thisArg?: any
) {
  return flatMap(selector, concurrent, thisArg)(this);
}

AsyncIterableX.prototype.flatMap = flatMapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}
