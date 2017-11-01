import { OperatorFunction } from '../interfaces';
import { IterableX } from './iterablex';

/* tslint:disable:max-line-length */
export function pipe<T>(source: Iterable<T>): IterableX<T>;
export function pipe<T, A>(source: Iterable<T>, op1: OperatorFunction<T, A>): IterableX<A>;
export function pipe<T, A, B>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>
): IterableX<B>;
export function pipe<T, A, B, C>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): IterableX<C>;
export function pipe<T, A, B, C, D>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): IterableX<D>;
export function pipe<T, A, B, C, D, E>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): IterableX<E>;
export function pipe<T, A, B, C, D, E, F>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>
): IterableX<F>;
export function pipe<T, A, B, C, D, E, F, G>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>
): IterableX<G>;
export function pipe<T, A, B, C, D, E, F, G, H>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>
): IterableX<H>;
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  source: Iterable<T>,
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>
): IterableX<I>;
/* tslint:enable:max-line-length */

export function pipe<TSource, TResult>(
  source: Iterable<TSource>,
  ...operations: OperatorFunction<TSource, TResult>[]
): IterableX<TResult> {
  if (operations.length === 0) {
    return source instanceof IterableX ? source : IterableX.from(source);
  }

  const piped = (input: Iterable<TSource>): IterableX<TResult> => {
    return operations.reduce(
      (prev: any, fn: OperatorFunction<TSource, TResult>) => fn(prev),
      input as any
    );
  };

  return piped(source);
}
