import { IterableX } from '../iterable';
import { create } from './create';

class SharedIterable<T> extends IterableX<T> {
  private _it: Iterator<T>;

  constructor(it: Iterator<T>) {
    super();
    this._it = it;
  }

  [Symbol.iterator]() {
    return this._it;
  }
}

export function share<TSource>(source: Iterable<TSource>): IterableX<TSource>;
export function share<TSource, TResult>(
    source: Iterable<TSource>,
    fn?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
export function share<TSource, TResult>(
    source: Iterable<TSource>,
    fn?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return fn ?
    create(() => fn(new SharedIterable(source[Symbol.iterator]()))[Symbol.iterator]()) :
    new SharedIterable(source[Symbol.iterator]());
}
