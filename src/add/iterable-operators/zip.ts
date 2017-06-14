import { IterableX } from '../../iterable';
import { zip } from '../../iterable/zip';

/**
 * @ignore
 */
export function zipProto<T, TResult>(
    this: IterableX<T>,
    second: Iterable<T>,
    fn: (fst: T, snd: T) => TResult): IterableX<TResult> {
  return zip(this, second, fn);
}

IterableX.prototype.zip = zipProto;

declare module '../../iterable' {
  interface IterableX<T> {
    zip: typeof zipProto;
  }
}