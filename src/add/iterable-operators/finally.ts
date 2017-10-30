import { IterableX } from '../../iterable/iterablex';
import { _finally as _finallyProto } from '../../iterable/finally';

/**
 * @ignore
 */
export function finallyProto<TSource>(this: IterableX<TSource>, action: () => void) {
  return _finallyProto(this, action);
}

IterableX.prototype.finally = finallyProto;

export declare namespace iterable {
  let _finally: typeof _finallyProto;
}

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    finally: typeof finallyProto;
  }
}
