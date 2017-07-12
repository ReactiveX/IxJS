import { IterableX } from '../iterable';
import { bindCallback } from '../internal/bindcallback';

class MapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _selector: (value: TSource, index: number) => TResult;

  constructor(source: Iterable<TSource>, selector: (value: TSource, index: number) => TResult) {
    super();
    this._source = source;
    this._selector = selector;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (let item of this._source) {
      yield this._selector(item, i++);
    }
  }
}

export function map<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (value: TSource, index: number) => TResult,
    thisArg?: any): IterableX<TResult> {
  return new MapIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 2));
}
