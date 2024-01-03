import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { finalize as _finalizeProto } from '../../asynciterable/operators/finalize.js';

/**
 * @ignore
 */
export function finalizeProto<T>(this: AsyncIterableX<T>, action: () => any | Promise<any>) {
  return _finalizeProto<T>(action)(this);
}

AsyncIterableX.prototype.finalize = finalizeProto;

export declare namespace asynciterable {
  let finalize: typeof _finalizeProto;
}

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    finalize: typeof finalizeProto;
  }
}
