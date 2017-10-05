import { IterableX } from '../iterable';
import { booleanPredicate } from '../internal/predicates';

class TakeWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: booleanPredicate<TSource>;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (let item of this._source) {
      if (!this._predicate(item, i++)) { break; }
      yield item;
    }
  }
}

export function takeWhile<TSource>(
    source: Iterable<TSource>,
    predicate: booleanPredicate<TSource>): IterableX<TSource> {
  return new TakeWhileIterable<TSource>(source, predicate);
}
