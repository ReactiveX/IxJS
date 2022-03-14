import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { concatMap } from '../../asynciterable/operators/concatmap';
import { FlattenConcurrentSelector } from '../../asynciterable/operators/_flatten';

/**
 * @ignore
 */
export function concatMapProto<T, R>(
  this: AsyncIterableX<T>,
  selector: FlattenConcurrentSelector<T, R>,
  thisArg?: any
) {
  return concatMap(selector, thisArg)(this);
}

AsyncIterableX.prototype.concatMap = concatMapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    concatMap: typeof concatMapProto;
  }
}
