import { IterableX } from '../../iterable';
import { _finally } from '../../iterable/finally';

export function finallyProto<TSource>(
    this: IterableX<TSource>,
    action: () => void) {
  return new IterableX(_finally(this, action));
}

IterableX.prototype.finally = finallyProto;

declare module '../../iterable' {
  interface IterableX<T> {
    finally: typeof finallyProto;
  }
}