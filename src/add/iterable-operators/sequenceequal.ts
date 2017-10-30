import { IterableX } from '../../iterable/iterablex';
import { sequenceEqual } from '../../iterable/sequenceequal';

/**
 * @ignore
 */
export function sequenceEqualProto<T>(
  this: IterableX<T>,
  other: Iterable<T>,
  cmp: (first: T, second: T) => boolean = (x, y) => x === y
): boolean {
  return sequenceEqual(this, other, cmp);
}

IterableX.prototype.sequenceEqual = sequenceEqualProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    sequenceEqual: typeof sequenceEqualProto;
  }
}
