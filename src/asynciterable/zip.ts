import { AsyncIterableX } from '../asynciterable';

class ZipIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _left: AsyncIterable<TSource>;
  private _right: AsyncIterable<TSource>;
  private _fn: (left: TSource, right: TSource) => TResult | Promise<TResult>;

  constructor(
      left: AsyncIterable<TSource>,
      right: AsyncIterable<TSource>,
      fn: (left: TSource, right: TSource) => TResult | Promise<TResult>) {
    super();
    this._left = left;
    this._right = right;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const it1 = this._left[Symbol.asyncIterator]();
    const it2 = this._right[Symbol.asyncIterator]();
    while (1) {
      const [next1, next2] = await Promise.all([it1.next(), it2.next()]);
      if (!next1.done && !next2.done) {
        yield await this._fn(next1.value, next2.value);
      } else {
        break;
      }
    }
  }
}

export function zip<TSource, TResult>(
    left: AsyncIterable<TSource>,
    right: AsyncIterable<TSource>,
    fn: (left: TSource, right: TSource) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return new ZipIterable<TSource, TResult>(left, right, fn);
}
