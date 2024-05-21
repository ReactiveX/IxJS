import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { sequenceEqual, SequencEqualOptions } from '../../asynciterable/sequenceequal.js';

/**
 * @ignore
 */
export async function sequenceEqualProto<T>(
  this: AsyncIterable<T>,
  other: AsyncIterable<T>,
  options?: SequencEqualOptions<T>
): Promise<boolean> {
  return sequenceEqual(this, other, options);
}

AsyncIterableX.prototype.sequenceEqual = sequenceEqualProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    sequenceEqual: typeof sequenceEqualProto;
  }
}
