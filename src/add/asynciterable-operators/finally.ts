import { AsyncIterableX } from '../../asynciterable';
import { _finally } from '../../asynciterable/finally';

export function finallyProto<TSource>(
    this: AsyncIterableX<TSource>,
    action: () => void) {
  return new AsyncIterableX(_finally(this, action));
}

AsyncIterableX.prototype.finally = finallyProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    finally: typeof finallyProto;
  }
}