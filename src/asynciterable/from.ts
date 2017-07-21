import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';
import { identityAsync } from '../internal/identity';
import { toLength } from '../internal/tolength';
import { isIterable, isAsyncIterable } from '../internal/isiterable';
import { Observable } from '../observer';

class FromArrayIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
  private _source: ArrayLike<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
      source: ArrayLike<TSource>,
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
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
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
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
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    const item = await this._source;
    yield await this._selector(item, 0);
  }
}

class AsyncObserver<TSource> {
  public values: TSource[];
  public hasError: boolean;
  public hasCompleted: boolean;
  public errorValue: any;
  public closed: boolean;

  constructor() {
    this.values = [];
    this.hasCompleted = false;
    this.hasError = false;
    this.errorValue = null;
    this.closed = false;
  }

  next(value: TSource) {
    if (!this.closed) {
      this.values.push(value);
    }
  }

  error(err: any) {
    if (!this.closed) {
      this.closed = true;
      this.hasError = true;
      this.errorValue = err;
    }
  }

  complete() {
    if (!this.closed) {
      this.closed = true;
    }
  }
}

class FromObservableAsyncIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
  private _observable: Observable<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
      observable: Observable<TSource>,
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
    super();
    this._observable = observable;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    const observer = new AsyncObserver<TSource>();
    const subscription = this._observable.subscribe(observer);

    let i = 0;
    while (1) {
      if (observer.values.length > 0) {
        yield await this._selector(observer.values.shift(), i++);
      } else if (observer.closed) {
        subscription.unsubscribe();
        if (observer.hasError) {
          throw observer.errorValue;
        } else {
          break;
        }
      }
    }
  }
}

export type AsyncIterableInput<TSource> =
  Iterable<TSource | PromiseLike<TSource>> |
  AsyncIterable<TSource> |
  ArrayLike<TSource> |
  PromiseLike<TSource> |
  Observable<TSource>;

function isPromise(x: any): x is PromiseLike<any> {
  return x != null && Object(x) === x && typeof x['then'] === 'function';
}

function isObservable(x: any): x is Observable<any> {
  return x != null && Object(x) === x && typeof x['subscribe'] === 'function';
}

function isArrayLike(x: any): x is ArrayLike<any> {
  return x != null && Object(x) === x && typeof x['length'] === 'number';
}

export function from<TSource, TResult = TSource>(
    source: AsyncIterableInput<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult> = identityAsync,
    thisArg?: any): AsyncIterableX<TResult> {
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

  throw new TypeError('Input type not supported');
}
