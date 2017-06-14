import { AsyncIterableX } from '../../asynciterable';
import { sequenceEqual } from '../../asynciterable/sequenceequal';
import { comparerAsync } from '../../internal/comparer';

/**
 * @ignore
 */
export function sequenceEqualProto<T>(
    this: AsyncIterableX<T>,
    other: AsyncIterable<T>,
    comparer: (first: T, second: T) => boolean | Promise<boolean> = comparerAsync): Promise<boolean> {
  return sequenceEqual(this, other, comparer);
}

AsyncIterableX.prototype.sequenceEqual = sequenceEqualProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    sequenceEqual: typeof sequenceEqualProto;
  }
}