import { IterableX } from '../../iterable/iterablex.js';
import { finalize as _finalize } from '../../iterable/operators/finalize.js';

/**
 * @ignore
 */
export function finalizeProto<T>(this: IterableX<T>, action: () => void) {
  return _finalize<T>(action)(this);
}

IterableX.prototype.finally = finalizeProto;

export declare namespace iterable {
  let finalize: typeof _finalize;
}

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    finally: typeof finalizeProto;
  }
}
