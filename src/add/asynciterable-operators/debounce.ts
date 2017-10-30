import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { debounce } from '../../asynciterable/debounce';

/**
 * @ignore
 */
export function debounceProto<T>(this: AsyncIterableX<T>, time: number): AsyncIterableX<T> {
  return debounce(this, time);
}

AsyncIterableX.prototype.debounce = debounceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    debounce: typeof debounceProto;
  }
}
