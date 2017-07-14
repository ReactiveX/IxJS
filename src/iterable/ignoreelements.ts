import { IterableX } from '../iterable';

class IgnoreElementsIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator](): Iterator<TSource> {
    // tslint:disable-next-line:no-empty
    for (let _ of this._source) { }
  }
}

export function ignoreElements<TSource>(source: Iterable<TSource>): IterableX<TSource> {
  return new IgnoreElementsIterable<TSource>(source);
}
