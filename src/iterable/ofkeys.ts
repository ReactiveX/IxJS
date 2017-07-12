import { IterableX } from '../iterable';

class OfKeysIterable<TSource> extends IterableX<string> {
  private _source: { [key: string]: TSource };

  constructor(source: { [key: string]: TSource }) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return Object.keys(this._source)[Symbol.iterator]();
  }
}

export function ofKeys<TSource>(source: { [key: string]: TSource }): IterableX<string> {
  return new OfKeysIterable<TSource>(source);
}
