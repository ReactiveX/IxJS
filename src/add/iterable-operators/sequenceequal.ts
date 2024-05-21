import { IterableX } from '../../iterable/iterablex.js';
import { sequenceEqual, SequencEqualOptions } from '../../iterable/sequenceequal.js';

/**
 * @ignore
 */
export function sequenceEqualProto<T>(
  this: IterableX<T>,
  other: Iterable<T>,
  options?: SequencEqualOptions<T>
): boolean {
  return sequenceEqual(this, other, options);
}

IterableX.prototype.sequenceEqual = sequenceEqualProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    sequenceEqual: typeof sequenceEqualProto;
  }
}
