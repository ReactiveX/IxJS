import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { map } from '../../asynciterable/operators/map';

/**
 * @ignore
 */
export function mapProto<T, R>(
  this: AsyncIterableX<T>,
  selector: (value: T, index: number) => Promise<R> | R,
  thisArg?: any
): AsyncIterableX<R> {
  return map<T, R>(selector, thisArg)(this);
}

AsyncIterableX.prototype.map = mapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    map: typeof mapProto;
  }
}
