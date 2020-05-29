import { as as asAsyncIterable } from './as';
import { _initialize as _initializeFrom } from './from';
import { OperatorAsyncFunction, UnaryFunction } from '../interfaces';
import { Observable } from '../observer';
import { isReadableNodeStream, isWritableNodeStream } from '../util/isiterable';

class WithAbortAsyncIterable<TSource> implements AsyncIterable<TSource> {
  private _source: AsyncIterable<TSource>;
  private _signal: AbortSignal;

  constructor(source: AsyncIterable<TSource>, signal: AbortSignal) {
    this._source = source;
    this._signal = signal;
  }

  [Symbol.asyncIterator](): AsyncIterator<TSource> {
    // @ts-ignore
    return this._source[Symbol.asyncIterator](this._signal);
  }
}

/**
 * This class serves as the base for all operations which support [Symbol.asyncIterator].
 */
export abstract class AsyncIterableX<T> implements AsyncIterable<T> {
  abstract [Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<T>;

  async forEach(
    projection: (value: T, index: number, signal?: AbortSignal) => void | Promise<void>,
    thisArg?: any,
    signal?: AbortSignal
  ): Promise<void> {
    const source = signal ? new WithAbortAsyncIterable(this, signal) : this;

    let i = 0;
    for await (const item of source) {
      await projection.call(thisArg, item, i++, signal);
    }
  }

  /** @nocollapse */
  pipe<R>(...operations: UnaryFunction<AsyncIterable<T>, R>[]): R;
  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  pipe<R>(...args: any[]) {
    let i = -1;
    const n = args.length;
    let acc: any = this;
    while (++i < n) {
      acc = args[i](asAsyncIterable(acc));
    }
    return acc;
  }
}

(<any>AsyncIterableX.prototype)[Symbol.toStringTag] = 'AsyncIterableX';

Object.defineProperty(AsyncIterableX, Symbol.hasInstance, {
  writable: true,
  configurable: true,
  value(inst: any) {
    return !!(inst && inst[Symbol.toStringTag] === 'AsyncIterableX');
  },
});

_initializeFrom(AsyncIterableX);

export type AsyncIterableInput<TSource> =
  | AsyncIterable<TSource>
  | AsyncIterator<TSource>
  | Iterable<TSource | PromiseLike<TSource>>
  | ArrayLike<TSource>
  | PromiseLike<TSource>
  | Observable<TSource>;

type WritableOrOperatorAsyncFunction<T, R> =
  | NodeJS.WritableStream
  | NodeJS.ReadWriteStream
  | OperatorAsyncFunction<T, R>;

declare module '../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    pipe(): AsyncIterableX<T>;
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
    pipe(...operations: OperatorAsyncFunction<any, any>[]): AsyncIterableX<{}>;
    pipe<A extends NodeJS.WritableStream>(op1: A, options?: { end?: boolean }): A;
  }
}

try {
  ((isBrowser) => {
    if (isBrowser) {
      return;
    }

    AsyncIterableX.prototype['pipe'] = nodePipe;
    const readableOpts = (x: any, opts = x._writableState || { objectMode: true }) => opts;

    function nodePipe<T>(this: AsyncIterableX<T>, ...args: any[]) {
      let i = -1;
      let end: boolean;
      const n = args.length;
      let prev: any = this;
      let next: WritableOrOperatorAsyncFunction<T, any>;
      while (++i < n) {
        next = args[i];
        if (typeof next === 'function') {
          prev = next(asAsyncIterable(prev));
        } else if (isWritableNodeStream(next)) {
          ({ end = true } = args[i + 1] || {});
          // prettier-ignore
          return isReadableNodeStream(prev) ? prev.pipe(next, {end}) :
            asAsyncIterable(prev).toNodeStream(readableOpts(next)).pipe(next, {end});
        }
      }
      return prev;
    }
  })(typeof window === 'object' && typeof document === 'object' && document.nodeType === 9);
} catch (e) {
  /* */
}
