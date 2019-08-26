import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { takeLast } from '../../asynciterable/operators/takelast';

/**
 * @ignore
 */
export function takeLastProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return takeLast<T>(count)(this);
}

AsyncIterableX.prototype.takeLast = takeLastProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    takeLast: typeof takeLastProto;
  }
}
