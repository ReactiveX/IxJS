import { OperatorAsyncFunction } from '../interfaces';
import { AsyncIterableX } from '../asynciterable';

/* tslint:disable:max-line-length */
export function pipe<T>(source: AsyncIterable<T>): AsyncIterableX<T>;
export function pipe<T, A>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>): AsyncIterableX<A>;
export function pipe<T, A, B>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>): AsyncIterableX<B>;
export function pipe<T, A, B, C>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>): AsyncIterableX<C>;
export function pipe<T, A, B, C, D>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>, op4: OperatorAsyncFunction<C, D>): AsyncIterableX<D>;
export function pipe<T, A, B, C, D, E>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>, op4: OperatorAsyncFunction<C, D>, op5: OperatorAsyncFunction<D, E>): AsyncIterableX<E>;
export function pipe<T, A, B, C, D, E, F>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>, op4: OperatorAsyncFunction<C, D>, op5: OperatorAsyncFunction<D, E>, op6: OperatorAsyncFunction<E, F>): AsyncIterableX<F>;
export function pipe<T, A, B, C, D, E, F, G>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>, op4: OperatorAsyncFunction<C, D>, op5: OperatorAsyncFunction<D, E>, op6: OperatorAsyncFunction<E, F>, op7: OperatorAsyncFunction<F, G>): AsyncIterableX<G>;
export function pipe<T, A, B, C, D, E, F, G, H>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>, op4: OperatorAsyncFunction<C, D>, op5: OperatorAsyncFunction<D, E>, op6: OperatorAsyncFunction<E, F>, op7: OperatorAsyncFunction<F, G>, op8: OperatorAsyncFunction<G, H>): AsyncIterableX<H>;
export function pipe<T, A, B, C, D, E, F, G, H, I>(source: AsyncIterable<T>, op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>, op3: OperatorAsyncFunction<B, C>, op4: OperatorAsyncFunction<C, D>, op5: OperatorAsyncFunction<D, E>, op6: OperatorAsyncFunction<E, F>, op7: OperatorAsyncFunction<F, G>, op8: OperatorAsyncFunction<G, H>, op9: OperatorAsyncFunction<H, I>): AsyncIterableX<I>;
/* tslint:enable:max-line-length */

export function pipe<TSource, TResult>(
    source: AsyncIterable<TSource>,
    ...operations: OperatorAsyncFunction<TSource, TResult>[]): AsyncIterableX<TResult> {
  if (operations.length === 0) {
    return source as any;
  }

  const piped = (input: AsyncIterable<TSource>): AsyncIterableX<TResult> => {
    return operations.reduce((prev: any, fn: OperatorAsyncFunction<TSource, TResult>) => fn(prev), input);
  };

  return piped(source);
}
