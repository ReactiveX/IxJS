/* eslint-disable no-shadow */
import { AsyncIterableInput, AsyncIterableX } from './asynciterablex';
import { identityAsync } from '../util/identity';
import { bindCallback } from '../util/bindcallback';
import {
  isIterable,
  isAsyncIterable,
  isArrayLike,
  isIterator,
  isPromise,
  isObservable
} from '../util/isiterable';
import { Observable } from '../observer';
import { toLength } from '../util/tolength';
import { AsyncSink } from './asyncsink';

export let from: <TSource, TResult = TSource>(
  source: AsyncIterableInput<TSource>,
  selector?: (value: TSource, index: number) => TResult | Promise<TResult>,
  thisArg?: any
) => AsyncIterableX<TResult>;

export let FromArrayIterable: new <TSource, TResult = TSource>(
  source: ArrayLike<TSource>,
  selector: (value: TSource, index: number) => TResult | Promise<TResult>
) => AsyncIterableX<TResult>;

export let FromAsyncIterable: new <TSource, TResult = TSource>(
  source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
  selector: (value: TSource, index: number) => TResult | Promise<TResult>
) => AsyncIterableX<TResult>;

export let FromPromiseIterable: new <TSource, TResult = TSource>(
  source: PromiseLike<TSource>,
  selector: (value: TSource, index: number) => TResult | Promise<TResult>
) => AsyncIterableX<TResult>;

export let FromObservableAsyncIterable: new <TSource, TResult = TSource>(
  observable: Observable<TSource>,
  selector: (value: TSource, index: number) => TResult | Promise<TResult>
) => AsyncIterableX<TResult>;

export function _initialize(Ctor: typeof AsyncIterableX) {
  /** @nocollapse */
  from = function<TSource, TResult = TSource>(
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
    /* tslint:enable */
  };

  FromArrayIterable = class FromArrayIterable<TSource, TResult = TSource> extends Ctor<TResult> {
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
  };

  FromAsyncIterable = class FromAsyncIterable<TSource, TResult = TSource> extends Ctor<TResult> {
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

    async *[Symbol.asyncIterator]() {
      let i = 0;
      for await (const item of <AsyncIterable<TSource>>this._source) {
        yield await this._selector(item, i++);
      }
    }
  };

  FromPromiseIterable = class FromPromiseIterable<TSource, TResult = TSource> extends Ctor<
    TResult
  > {
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
      const item = await this._source;
      yield await this._selector(item, 0);
    }
  };

  FromObservableAsyncIterable = class FromObservableAsyncIterable<
    TSource,
    TResult = TSource
  > extends Ctor<TResult> {
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

    async *[Symbol.asyncIterator]() {
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
        }
      });

      let i = 0;
      try {
        for (let next; !(next = await sink.next()).done; ) {
          yield await this._selector(next.value!, i++);
        }
      } finally {
        subscription.unsubscribe();
      }
    }
  };
}
