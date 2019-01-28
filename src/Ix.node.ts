export * from './Ix';

export { IterableReadable } from './iterable/tonodestream';
export { AsyncIterableReadable } from './asynciterable/tonodestream';
export { fromNodeStream, ReadableStreamAsyncIterable } from './asynciterable/fromnodestream';

import { OperatorAsyncFunction } from './interfaces';
import { AsyncIterableX } from './asynciterable/asynciterablex';

AsyncIterableX.prototype.pipe = nodePipe;

/* tslint:disable */
const isReadable = (isReadableStream => (x: any): x is NodeJS.ReadableStream =>
  isReadableStream(x))(require('is-stream').readable);

const readableOpts = (x: any, opts = x._writableState || { objectMode: true }) => opts;

function nodePipe<T, R>(
  this: AsyncIterableX<T>,
  ...operations: (NodeJS.WritableStream | NodeJS.ReadWriteStream | OperatorAsyncFunction<T, R>)[]
): AsyncIterableX<R> {
  if (operations.length === 0) {
    return this as any;
  }
  const piped = (input: AsyncIterable<T>): AsyncIterableX<R> => {
    return operations.reduce(
      (
        prev: any,
        writableOrOperator:
          | NodeJS.WritableStream
          | NodeJS.ReadWriteStream
          | OperatorAsyncFunction<T, R>
      ) =>
        typeof writableOrOperator === 'function'
          ? writableOrOperator(prev)
          : (isReadable(prev) ? prev : prev.toNodeStream(readableOpts(writableOrOperator))).pipe(
              writableOrOperator
            ),
      input as any
    );
  };
  return piped(this);
}

declare module './asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    pipe(): AsyncIterableX<T>;
    pipe<A extends NodeJS.WritableStream>(op1: A): A;
    pipe<A>(op1: OperatorAsyncFunction<T, A>): AsyncIterableX<A>;
    pipe<A, B>(
      op1: OperatorAsyncFunction<T, A>,
      op2: OperatorAsyncFunction<A, B>
    ): AsyncIterableX<B>;
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
    pipe<R>(
      ...operations: (
        | NodeJS.WritableStream
        | NodeJS.ReadWriteStream
        | OperatorAsyncFunction<T, R>)[]
    ): AsyncIterableX<R>;
  }
}
