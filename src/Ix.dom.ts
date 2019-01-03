import * as iterableX from './iterable/index';
import * as iterableXPipe from './iterable/pipe/index';
import * as asynciterableX from './asynciterable/index';
import * as asynciterableXPipe from './asynciterable/pipe/index';

export { iterableX as iterable };
export { iterableXPipe as iterablePipe };
export { asynciterableX as asynciterable };
export { asynciterableXPipe as asynciterablePipe };

// Manually re-export because closure-compiler doesn't support `export * from X` syntax yet
export { default } from './Ix';
export { OrderedIterable } from './Ix';
export { OrderedIterableBase } from './Ix';
export { OrderedAsyncIterable } from './Ix';
export { OrderedAsyncIterableBase } from './Ix';
export { AsyncSink, Iterable, AsyncIterable } from './Ix';

import { OperatorAsyncFunction } from './interfaces';

type PipeInput<T, R> = OperatorAsyncFunction<T, R>;

declare module './asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    pipe(): AsyncIterableX<T>;
    pipe<A>(op1: PipeInput<T, A>): AsyncIterableX<A>;
    pipe<A, B>(op1: PipeInput<T, A>, op2: PipeInput<A, B>): AsyncIterableX<B>;
    pipe<A, B, C>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>
    ): AsyncIterableX<C>;
    pipe<A, B, C, D>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>,
      op4: PipeInput<C, D>
    ): AsyncIterableX<D>;
    pipe<A, B, C, D, E>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>,
      op4: PipeInput<C, D>,
      op5: PipeInput<D, E>
    ): AsyncIterableX<E>;
    pipe<A, B, C, D, E, F>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>,
      op4: PipeInput<C, D>,
      op5: PipeInput<D, E>,
      op6: PipeInput<E, F>
    ): AsyncIterableX<F>;
    pipe<A, B, C, D, E, F, G>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>,
      op4: PipeInput<C, D>,
      op5: PipeInput<D, E>,
      op6: PipeInput<E, F>,
      op7: PipeInput<F, G>
    ): AsyncIterableX<G>;
    pipe<A, B, C, D, E, F, G, H>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>,
      op4: PipeInput<C, D>,
      op5: PipeInput<D, E>,
      op6: PipeInput<E, F>,
      op7: PipeInput<F, G>,
      op8: PipeInput<G, H>
    ): AsyncIterableX<H>;
    pipe<A, B, C, D, E, F, G, H, I>(
      op1: PipeInput<T, A>,
      op2: PipeInput<A, B>,
      op3: PipeInput<B, C>,
      op4: PipeInput<C, D>,
      op5: PipeInput<D, E>,
      op6: PipeInput<E, F>,
      op7: PipeInput<F, G>,
      op8: PipeInput<G, H>,
      op9: PipeInput<H, I>
    ): AsyncIterableX<I>;
    pipe<R>(...operations: PipeInput<T, R>[]): AsyncIterableX<R>;
  }
}
