import { AsyncIterableX } from '../../asynciterable';
import { chain as chainStatic } from '../../asynciterable/chain';

/**
 * @ignore
 */
export function chainProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    selector: (source: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult> {
  return chainStatic<TSource, TResult>(this, selector);
}

AsyncIterableX.prototype.chain = chainProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    chain: typeof chainProto;
  }
}