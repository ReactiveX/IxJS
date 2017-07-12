import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';
import { identityAsync } from '../internal/identity';
import { toLength } from '../internal/tolength';
import { isIterable, isAsyncIterable } from '../internal/isiterable';

class FromAsyncIterable<TSource, TResult = TSource> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource> | ArrayLike<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
      source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource> | ArrayLike<TSource>,
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    const iterable = isIterable(this._source) || isAsyncIterable(this._source);
    let i = 0;
    if (iterable) {
      for await (let item of <AsyncIterable<TSource>>this._source) {
        yield await this._selector(item, i++);
      }
    } else {
      let length = toLength((<ArrayLike<TSource>>this._source).length);
      while (i < length) {
        let val = (<ArrayLike<TSource>>this._source)[i];
        yield await this._selector(val, i++);
      }
    }
  }
}

export function from<TSource, TResult = TSource>(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource> | ArrayLike<TSource>,
    fn: (value: TSource, index: number) => TResult | Promise<TResult> = identityAsync,
    thisArg?: any): AsyncIterableX<TResult> {
  return new FromAsyncIterable<TSource, TResult>(source, bindCallback(fn, thisArg, 2));
}
