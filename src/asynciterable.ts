import { OperatorAsyncFunction } from './interfaces';
import { bindCallback } from './internal/bindcallback';

/**
 * This clas serves as the base for all operations which support [Symbol.asyncIterator].
 */
export abstract class AsyncIterableX<T> implements AsyncIterable<T> {
  abstract [Symbol.asyncIterator](): AsyncIterator<T>;

  async forEach(
    projection: (value: T, index: number) => void | Promise<void>,
    thisArg?: any
  ): Promise<void> {
    const fn = bindCallback(projection, thisArg, 2);
    let i = 0;
    for await (let item of this) {
      await fn(item, i++);
    }
  }

  pipe(): AsyncIterableX<T>;
  pipe<A>(op1: OperatorAsyncFunction<T, A>): AsyncIterableX<A>;
  pipe<A, B>(op1: OperatorAsyncFunction<T, A>, op2: OperatorAsyncFunction<A, B>): AsyncIterableX<B>;
  pipe<A, B, C>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>
  ): AsyncIterableX<C>;
  pipe<A, B, C, D>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>,
    op4: OperatorAsyncFunction<C, D>
  ): AsyncIterableX<D>;
  pipe<A, B, C, D, E>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>,
    op4: OperatorAsyncFunction<C, D>,
    op5: OperatorAsyncFunction<D, E>
  ): AsyncIterableX<E>;
  pipe<A, B, C, D, E, F>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>,
    op4: OperatorAsyncFunction<C, D>,
    op5: OperatorAsyncFunction<D, E>,
    op6: OperatorAsyncFunction<E, F>
  ): AsyncIterableX<F>;
  pipe<A, B, C, D, E, F, G>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>,
    op4: OperatorAsyncFunction<C, D>,
    op5: OperatorAsyncFunction<D, E>,
    op6: OperatorAsyncFunction<E, F>,
    op7: OperatorAsyncFunction<F, G>
  ): AsyncIterableX<G>;
  pipe<A, B, C, D, E, F, G, H>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>,
    op4: OperatorAsyncFunction<C, D>,
    op5: OperatorAsyncFunction<D, E>,
    op6: OperatorAsyncFunction<E, F>,
    op7: OperatorAsyncFunction<F, G>,
    op8: OperatorAsyncFunction<G, H>
  ): AsyncIterableX<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperatorAsyncFunction<T, A>,
    op2: OperatorAsyncFunction<A, B>,
    op3: OperatorAsyncFunction<B, C>,
    op4: OperatorAsyncFunction<C, D>,
    op5: OperatorAsyncFunction<D, E>,
    op6: OperatorAsyncFunction<E, F>,
    op7: OperatorAsyncFunction<F, G>,
    op8: OperatorAsyncFunction<G, H>,
    op9: OperatorAsyncFunction<H, I>
  ): AsyncIterableX<I>;
  /* tslint:enable:max-line-length */

  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R> {
    if (operations.length === 0) {
      return this as any;
    }

    const piped = (input: AsyncIterable<T>): AsyncIterableX<R> => {
      return operations.reduce((prev: any, fn: OperatorAsyncFunction<T, R>) => fn(prev), input);
    };

    return piped(this);
  }
}
