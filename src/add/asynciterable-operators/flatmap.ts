import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { flatMap } from '../../asynciterable/operators/flatmap';
import { FlattenConcurrentSelector } from '../../asynciterable/operators/_flatten';

/**
 * @ignore
 */
export function flatMapProto<T, R>(
  this: AsyncIterableX<T>,
  selector: FlattenConcurrentSelector<T, R>,
  thisArg?: any
) {
  return flatMap(selector, thisArg)(this);
}

AsyncIterableX.prototype.flatMap = flatMapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}
