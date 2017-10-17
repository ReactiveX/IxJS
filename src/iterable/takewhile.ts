import { IterableX } from '../iterable';

class TakeWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (let item of this._source) {
      if (!this._predicate(item, i++)) {
        break;
      }
      yield item;
    }
  }
}

export function takeWhile<T, S extends T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => value is S
): IterableX<S>;
export function takeWhile<TSource>(
  source: Iterable<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource>;
export function takeWhile<TSource>(
  source: Iterable<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource> {
  return new TakeWhileIterable<TSource>(source, predicate);
}
