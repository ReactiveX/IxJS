import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { debounce } from '../../asynciterable/operators/debounce.js';

/**
 * @ignore
 */
export function debounceProto<T>(this: AsyncIterableX<T>, time: number): AsyncIterableX<T> {
  return debounce<T>(time)(this);
}

AsyncIterableX.prototype.debounce = debounceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    debounce: typeof debounceProto;
  }
}
