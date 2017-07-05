import { AsyncIterableX } from '../../asynciterable';
import { takeUntil } from '../../asynciterable/takeuntil';

/**
 * @ignore
 */
export function takeUntilProto<TSource>(
    this: AsyncIterable<TSource>,
    other: Promise<any>): AsyncIterableX<TSource> {
  return takeUntil(this, other);
}

AsyncIterableX.prototype.takeUntil = takeUntilProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    takeUntil: typeof takeUntilProto;
  }
}