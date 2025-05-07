import { OperatorAsyncFunction, UnaryFunction } from '../interfaces.js';
import { Observable } from '../observer.js';
import { bindCallback } from '../util/bindcallback.js';
import { identityAsync } from '../util/identity.js';
import {
  isReadableNodeStream,
  isWritableNodeStream,
  isIterable,
  isAsyncIterable,
  isArrayLike,
  isIterator,
  isPromise,
  isObservable,
} from '../util/isiterable.js';
import { toLength } from '../util/tolength.js';
import { AbortError, throwIfAborted } from '../aborterror.js';

/**
 * This class serves as the base for all operations which support [Symbol.asyncIterator].
 */
export abstract class AsyncIterableX<T> implements AsyncIterable<T> {
  abstract [Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<T>;

  /** @nocollapse */
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
      acc = args[i](AsyncIterableX.as(acc));
    }
    return acc;
  }

  /** @nocollapse */
  static from<TSource, TResult = TSource>(
    source: AsyncIterableInput<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult> = identityAsync,
    thisArg?: any
  ): AsyncIterableX<TResult> {
    const fn = bindCallback(selector, thisArg, 2);
    if (isIterable(source) || isAsyncIterable(source)) {
      return new FromAsyncIterable<TSource, TResult>(source, fn);
    }
    if (isPromise(source)) {
      return new FromPromiseIterable<TSource, TResult>(source, fn);
    }
    if (isObservable(source)) {
      return new FromObservableAsyncIterable<TSource, TResult>(source, fn);
    }
    if (isArrayLike(source)) {
      return new FromArrayIterable<TSource, TResult>(source, fn);
    }
    if (isIterator(source)) {
      return new FromAsyncIterable<TSource, TResult>({ [Symbol.asyncIterator]: () => source }, fn);
    }
    throw new TypeError('Input type not supported');
  }

  /**
   * Converts an existing string into an async-iterable of characters.
   *
   * @param {string} source The string to convert to an async-iterable.
   * @returns {AsyncIterableX<string>} An async-iterable stream of characters from the source.
   */
  static as(source: string): AsyncIterableX<string>;
  /**
   * Converts the AsyncIterable-like input or single element into an AsyncIterable.
   *
   * @template T The type of elements in the async-iterable like sequence.
   * @param {AsyncIterableInput<T>} source The async-iterable like input to convert to an async-iterable.
   * @returns {AsyncIterableX<T>} An async-iterable stream from elements in the async-iterable like sequence.
   */
  static as<T>(source: AsyncIterableInput<T> | T): AsyncIterableX<T>;
  /**
   * Converts the single element into an async-iterable sequence.
   *
   * @template T The type of the input to turn into an async-iterable sequence.
   * @param {T} source The single element to turn into an async-iterable sequence.
   * @returns {AsyncIterableX<T>} An async-iterable sequence which contains the single element.
   */
  static as<T>(source: T): AsyncIterableX<T>;
  /**
   * Converts the input into an async-iterable sequence.
   *
   * @param {*} source The source to convert to an async-iterable sequence.
   * @returns {AsyncIterableX<*>} An async-iterable containing the input.
   */
  /** @nocollapse */
  static as(source: any): AsyncIterableX<any> {
    if (source instanceof AsyncIterableX) {
      return source;
    }
    if (typeof source === 'string') {
      return new FromArrayIterable([source], identityAsync);
    }
    if (isIterable(source) || isAsyncIterable(source)) {
      return new FromAsyncIterable(source, identityAsync);
    }
    if (isPromise(source)) {
      return new FromPromiseIterable(source, identityAsync);
    }
    if (isObservable(source)) {
      return new FromObservableAsyncIterable(source, identityAsync);
    }
    if (isArrayLike(source)) {
      return new FromArrayIterable(source, identityAsync);
    }
    return new FromArrayIterable([source], identityAsync);
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

const ARRAY_VALUE = 'value';
const ARRAY_ERROR = 'error';

interface AsyncSinkItem<T> {
  type: string;
  value?: T;
  error?: any;
}

interface AsyncResolver<T> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

/** @ignore */
/** @ignore */
export class AsyncSink<TSource> implements AsyncIterableIterator<TSource> {
  private _ended: boolean;
  private _values: AsyncSinkItem<TSource>[];
  private _resolvers: AsyncResolver<IteratorResult<TSource>>[];

  constructor() {
    this._ended = false;
    this._values = [];
    this._resolvers = [];
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  write(value: TSource) {
    this._push({ type: ARRAY_VALUE, value });
  }

  error(error: any) {
    this._push({ type: ARRAY_ERROR, error });
  }

  private _push(item: AsyncSinkItem<TSource>) {
    if (this._ended) {
      throw new Error('AsyncSink already ended');
    }

    if (this._resolvers.length > 0) {
      const { resolve, reject } = this._resolvers.shift()!;
      if (item.type === ARRAY_ERROR) {
        reject(item.error!);
      } else {
        resolve({ done: false, value: item.value! });
      }
    } else {
      this._values.push(item);
    }
  }

  next() {
    if (this._values.length > 0) {
      const { type, value, error } = this._values.shift()!;
      if (type === ARRAY_ERROR) {
        return Promise.reject(error);
      } else {
        return Promise.resolve({ done: false, value } as IteratorResult<TSource>);
      }
    }

    if (this._ended) {
      return Promise.resolve({ done: true } as IteratorResult<TSource>);
    }

    return new Promise<IteratorResult<TSource>>((resolve, reject) => {
      this._resolvers.push({ resolve, reject });
    });
  }

  end() {
    while (this._resolvers.length > 0) {
      this._resolvers.shift()!.resolve({ done: true } as IteratorResult<TSource>);
    }
    this._ended = true;
  }
}

/** @ignore */
export class FromArrayIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
  private _source: ArrayLike<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
    source: ArrayLike<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    const length = toLength((<ArrayLike<TSource>>this._source).length);
    while (i < length) {
      yield await this._selector(this._source[i], i++);
    }
  }
}

/** @ignore */
export class FromAsyncIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let i = 0;
    if (signal && this._source instanceof AsyncIterableX) {
      for await (const item of new WithAbortAsyncIterable(this._source, signal)) {
        yield await this._selector(item, i++);
      }
    } else {
      throwIfAborted(signal);
      for await (const item of this._source) {
        throwIfAborted(signal);
        const value = await this._selector(item, i++);
        throwIfAborted(signal);
        yield value;
      }
    }
  }
}

/** @ignore */
export class FromPromiseIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
  private _source: PromiseLike<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
    source: PromiseLike<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    yield await this._selector(await this._source, 0);
  }
}

/** @ignore */
export class FromObservableAsyncIterable<TSource, TResult = TSource> extends AsyncIterableX<
  TResult
> {
  private _observable: Observable<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
    observable: Observable<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult>
  ) {
    super();
    this._observable = observable;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const sink: AsyncSink<TSource> = new AsyncSink<TSource>();
    const subscription = this._observable.subscribe({
      next(value: TSource) {
        sink.write(value);
      },
      error(err: any) {
        sink.error(err);
      },
      complete() {
        sink.end();
      },
    });

    function onAbort() {
      sink.error(new AbortError());
    }

    if (signal) {
      signal.addEventListener('abort', onAbort);
    }

    let i = 0;
    try {
      for (let next; !(next = await sink.next()).done; ) {
        throwIfAborted(signal);
        yield await this._selector(next.value!, i++);
      }
    } finally {
      if (signal) {
        signal.removeEventListener('abort', onAbort);
      }

      subscription.unsubscribe();
    }
  }
}

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

/** @ignore */
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
    pipe(...operations: OperatorAsyncFunction<any, any>[]): AsyncIterableX<any>;
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
          prev = next(AsyncIterableX.as(prev));
        } else if (isWritableNodeStream(next)) {
          ({ end = true } = args[i + 1] || {});
          // prettier-ignore
          return isReadableNodeStream(prev) ? prev.pipe(next, { end }) :
            AsyncIterableX.as(prev).toNodeStream(readableOpts(next)).pipe(next, { end });
        }
      }
      return prev;
    }
  })(typeof window === 'object' && typeof document === 'object' && document.nodeType === 9);
} catch (e) {
  /* */
}

export const as = AsyncIterableX.as;
export const from = AsyncIterableX.from;
