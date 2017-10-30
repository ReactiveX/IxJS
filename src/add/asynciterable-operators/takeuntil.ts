import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { takeUntil } from '../../asynciterable/takeuntil';

/**
 * @ignore
 */
export function takeUntilProto<TSource>(
  this: AsyncIterableX<TSource>,
  other: () => Promise<any>
): AsyncIterableX<TSource> {
  return takeUntil(this, other);
}

AsyncIterableX.prototype.takeUntil = takeUntilProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    takeUntil: typeof takeUntilProto;
  }
}
