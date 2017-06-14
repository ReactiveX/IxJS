import { AsyncIterableX } from '../../asynciterable';
import { startWith } from '../../asynciterable/startwith';

/**
 * @ignore
 */
export function startWithProto<T>(
    this: AsyncIterableX<T>,
    ...args: T[]) {
  return startWith(this, ...args);
}

AsyncIterableX.prototype.startWith = startWithProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    startWith: typeof startWithProto;
  }
}