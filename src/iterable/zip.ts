import { IterableX } from '../iterable';

class ZipIterable<TSource, TResult> extends IterableX<TResult> {
  private _left: Iterable<TSource>;
  private _right: Iterable<TSource>;
  private _fn: (left: TSource, right: TSource) => TResult;

  constructor(left: Iterable<TSource>, right: Iterable<TSource>, fn: (left: TSource, right: TSource) => TResult) {
    super();
    this._left = left;
    this._right = right;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    const it1 = this._left[Symbol.iterator](), it2 = this._right[Symbol.iterator]();
    let next1, next2;
    while (!(next1 = it1.next()).done && (!(next2 = it2.next()).done)) {
      yield this._fn(next1.value, next2.value);
    }
  }
}

export function zip<TSource, TResult>(
    left: Iterable<TSource>,
    right: Iterable<TSource>,
    fn: (left: TSource, right: TSource) => TResult): IterableX<TResult> {
  return new ZipIterable<TSource, TResult>(left, right, fn);
}
