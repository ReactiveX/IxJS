import { IterableX } from '../../iterable';
import { zip } from '../../iterable/zip';

export function zipProto<T, TResult>(
    this: IterableX<T>,
    second: IterableX<T>,
    fn: (fst: T, snd: T) => TResult): IterableX<TResult> {
  return new IterableX(zip(this, second, fn));
}

IterableX.prototype.zip = zipProto;

declare module '../../iterable' {
  interface IterableX<T> {
    zip: typeof zipProto;
  }
}