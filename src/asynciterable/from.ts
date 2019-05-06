import { AsyncIterableInput, AsyncIterableX } from './asynciterablex';
import { identityAsync } from '../util/identity';
import { bindCallback } from '../util/bindcallback';
import { Observable } from '../observer';
import { isIterable, isAsyncIterable, isArrayLike } from '../util/isiterable';
import { toLength } from '../util/tolength';
import { AsyncSink } from './asyncsink';

export function isPromise(x: any): x is PromiseLike<any> {
  return x != null && Object(x) === x && typeof x['then'] === 'function';
}

export function isObservable(x: any): x is Observable<any> {
  return x != null && Object(x) === x && typeof x['subscribe'] === 'function';
}

/** @nocollapse */
export function from<TSource, TResult = TSource>(
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

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of <AsyncIterable<TSource>>this._source) {
      yield await this._selector(item, i++);
    }
  }
}

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
    const item = await this._source;
    yield await this._selector(item, 0);
  }
}

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
