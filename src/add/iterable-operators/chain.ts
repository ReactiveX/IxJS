import { IterableX } from '../../iterable';
import { chain as chainStatic } from '../../iterable/chain';

/**
 * @ignore
 */
export function chainProto<TSource, TResult>(
    this: IterableX<TSource>,
    selector: (source: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult> {
  return chainStatic<TSource, TResult>(this, selector);
}

IterableX.prototype.chain = chainProto;

declare module '../../iterable' {
  interface IterableX<T> {
    chain: typeof chainProto;
  }
}