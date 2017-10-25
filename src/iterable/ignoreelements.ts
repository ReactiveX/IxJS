import { IterableX } from '../iterable';

export class IgnoreElementsIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator](): Iterator<TSource> {
    const it = this._source[Symbol.iterator]();
    while (!it.next().done) {
      /* intentionally empty */
    }
  }
}

export function ignoreElements<TSource>(source: Iterable<TSource>): IterableX<TSource> {
  return new IgnoreElementsIterable<TSource>(source);
}
