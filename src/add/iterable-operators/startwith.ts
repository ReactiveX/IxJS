import { IterableX } from '../../iterable';
import { startWith } from '../../iterable/startwith';

export function startWithProto<T>(
    this: IterableX<T>,
    ...args: Iterable<T>[]) {
  return new IterableX(startWith(this, ...args));
}

IterableX.prototype.startWith = startWithProto;

declare module '../../iterable' {
  interface IterableX<T> {
    startWith: typeof startWithProto;
  }
}