import { AsyncIterableX } from '../../asynciterable';
import { startWith } from '../../asynciterable/startwith';

export function startWithProto<T>(
    this: AsyncIterableX<T>,
    ...args: AsyncIterable<T>[]) {
  return new AsyncIterableX(startWith(this, ...args));
}

AsyncIterableX.prototype.startWith = startWithProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    startWith: typeof startWithProto;
  }
}