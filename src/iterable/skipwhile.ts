import { IterableX } from '../iterable';

class SkipWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let yielding = false, i = 0;
    for (let element of this._source) {
      if (!yielding && !this._predicate(element, i++)) { yielding = true; }
      if (yielding) { yield element; }
    }
  }
}

export function skipWhile<TSource>(
    source: Iterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): IterableX<TSource> {
  return new SkipWhileIterable<TSource>(source, predicate);
}
