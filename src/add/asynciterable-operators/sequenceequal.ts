import { AsyncIterableX } from '../../asynciterable';
import { sequenceEqual } from '../../asynciterable/sequenceequal';

export function sequenceEqualProto<T>(
    this: AsyncIterableX<T>,
    other: AsyncIterable<T>,
    cmp: (first: T, second: T) => boolean = (x, y) => x === y): Promise<boolean> {
  return sequenceEqual(this, other, cmp);
}

AsyncIterableX.prototype.sequenceEqual = sequenceEqualProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    sequenceEqual: typeof sequenceEqualProto;
  }
}