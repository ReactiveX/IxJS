import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { takeUntil } from '../../asynciterable/operators/takeuntil';

/**
 * @ignore
 */
export function takeUntilProto<T>(
  this: AsyncIterableX<T>,
  other: () => Promise<any>
): AsyncIterableX<T> {
  return takeUntil<T>(other)(this);
}

AsyncIterableX.prototype.takeUntil = takeUntilProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    takeUntil: typeof takeUntilProto;
  }
}
