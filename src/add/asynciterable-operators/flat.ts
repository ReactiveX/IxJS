import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { flat } from '../../asynciterable/operators/flat.js';

/**
 * @ignore
 */
export function flatProto<T, D extends number = -1>(
  this: AsyncIterableX<T>,
  depth: D = -1 as any,
  concurrent = Infinity
) {
  return flat(depth, concurrent)(this);
}

AsyncIterableX.prototype.flat = flatProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flat: typeof flatProto;
  }
}
