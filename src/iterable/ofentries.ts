import { IterableX } from './iterablex';
import { MapIterable } from './operators/map';

function makeTuple<TFirst, TSecond>(x: TFirst, y: TSecond): [TFirst, TSecond] {
  return [x, y];
}

class OfEntriesIterable<TSource> extends IterableX<[string, TSource]> {
  private _source: { [key: string]: TSource };

  constructor(source: { [key: string]: TSource }) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new MapIterable(Object.keys(this._source), key => makeTuple(key, this._source[key]))[
      Symbol.iterator
    ]();
  }
}

export function ofEntries<TSource>(source: {
  [key: string]: TSource;
}): IterableX<[string, TSource]> {
  return new OfEntriesIterable<TSource>(source);
}
