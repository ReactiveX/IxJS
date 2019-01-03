import { AsyncSink } from './../asyncsink';
import { OperatorAsyncFunction } from '../interfaces';
import { bindCallback } from '../internal/bindcallback';
import { identityAsync } from '../internal/identity';
import { toLength } from '../internal/tolength';
import { isArrayLike, isIterable, isAsyncIterable } from '../internal/isiterable';
import { Observable } from '../observer';

/**
 * This class serves as the base for all operations which support [Symbol.asyncIterator].
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

  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R> {
    if (operations.length === 0) {
      return this as any;
    }

    const piped = (input: AsyncIterable<T>): AsyncIterableX<R> => {
      return operations.reduce(
        (prev: any, fn: OperatorAsyncFunction<T, R>) => fn(prev),
        input as any
      );
    };

    return piped(this);
  }

  static as(source: string): AsyncIterableX<string>;
  static as<T>(source: AsyncIterableInput<T>): AsyncIterableX<T>;
  static as<T>(source: T): AsyncIterableX<T>;
  /** @nocollapse */
  static as(source: any) {
    /* tslint:disable */
    if (typeof source === 'string') {
      return new OfAsyncIterable([source]);
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
    return new OfAsyncIterable([source]);
    /* tslint:enable */
  }

  /** @nocollapse */
  static from<TSource, TResult = TSource>(
    source: AsyncIterableInput<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult> = identityAsync,
    thisArg?: any
  ): AsyncIterableX<TResult> {
    const fn = bindCallback(selector, thisArg, 2);
    /* tslint:disable */
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
    throw new TypeError('Input type not supported');
    /* tslint:enable */
  }

  /** @nocollapse */
  static of<TSource>(...args: TSource[]): AsyncIterableX<TSource> {
    //tslint:disable-next-line
    return new OfAsyncIterable<TSource>(args);
  }
}

class FromArrayIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
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

class FromAsyncIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
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
    for await (let item of <AsyncIterable<TSource>>this._source) {
      yield await this._selector(item, i++);
    }
  }
}

class FromPromiseIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
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
}

class FromObservableAsyncIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
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
}

export type AsyncIterableInput<TSource> =
  | AsyncIterable<TSource>
  | Iterable<TSource | PromiseLike<TSource>>
  | ArrayLike<TSource>
  | PromiseLike<TSource>
  | Observable<TSource>;

function isPromise(x: any): x is PromiseLike<any> {
  return x != null && Object(x) === x && typeof x['then'] === 'function';
}

function isObservable(x: any): x is Observable<any> {
  return x != null && Object(x) === x && typeof x['subscribe'] === 'function';
}

class OfAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _args: TSource[];

  constructor(args: TSource[]) {
    super();
    this._args = args;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this._args) {
      yield item;
    }
  }
}
