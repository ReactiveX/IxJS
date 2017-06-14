import { AsyncIterableX } from '../../asynciterable';
import { reverse } from '../../asynciterable/reverse';

/**
 * @ignore
 */
export function reverseProto<TSource>(this: AsyncIterableX<TSource>): AsyncIterableX<TSource> {
  return reverse(this);
}

AsyncIterableX.prototype.reverse = reverseProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    reverse: typeof reverseProto;
  }
}
