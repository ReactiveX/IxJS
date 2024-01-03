import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { switchAll } from '../../asynciterable/operators/switchall.js';

/**
 * @ignore
 */
export function switchAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>) {
  return switchAll()(this);
}

AsyncIterableX.prototype.switchAll = switchAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    switchAll: typeof switchAllProto;
  }
}
