import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _finally as _finallyProto } from '../../asynciterable/finally';

/**
 * @ignore
 */
export function finallyProto<TSource>(
  this: AsyncIterableX<TSource>,
  action: () => void | Promise<void>
) {
  return _finallyProto(this, action);
}

AsyncIterableX.prototype.finally = finallyProto;

export declare namespace asynciterable {
  let _finally: typeof _finallyProto;
}

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    finally: typeof finallyProto;
  }
}
