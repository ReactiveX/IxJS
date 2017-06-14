import { IterableX } from '../../iterable';
import { reverse } from '../../iterable/reverse';

/**
 * @ignore
 */
export function reverseProto<TSource>(this: IterableX<TSource>): IterableX<TSource> {
  return reverse(this);
}

IterableX.prototype.reverse = reverseProto;

declare module '../../iterable' {
  interface IterableX<T> {
    reverse: typeof reverseProto;
  }
}