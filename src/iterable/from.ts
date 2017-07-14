import { IterableX } from '../iterable';
import { bindCallback } from '../internal/bindcallback';
import { identity } from '../internal/identity';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

class FromIterable<TSource, TResult = TSource> extends IterableX<TResult> {
  private _source: Iterable<TSource> | ArrayLike<TSource>;
  private _fn: (value: TSource, index: number) => TResult;

  constructor(source: Iterable<TSource> | ArrayLike<TSource>, fn: (value: TSource, index: number) => TResult) {
    super();
    this._source = source;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    const iterable = isIterable(this._source);
    let i = 0;
    if (iterable) {
      for (let item of <Iterable<TSource>>this._source) {
        yield this._fn(item, i++);
      }
    } else {
      let length = toLength((<ArrayLike<TSource>>this._source).length);
      while (i < length) {
        let val = (<ArrayLike<TSource>>this._source)[i];
        yield this._fn(val, i++);
      }
    }
  }
}

export function from<TSource, TResult = TSource>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    fn: (value: TSource, index: number) => TResult = identity,
    thisArg?: any): IterableX<TResult> {
  return new FromIterable<TSource, TResult>(source, bindCallback(fn, thisArg, 2));
}
