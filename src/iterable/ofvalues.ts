import { IterableX } from '../iterable';
import { map } from './map';

class OfValuesIterable<TSource> extends IterableX<TSource> {
  private _source: { [key: string]: TSource };

  constructor(source: { [key: string]: TSource }) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return map(Object.keys(this._source), key => this._source[key])[Symbol.iterator]();
  }
}

export function ofValues<TSource>(source: { [key: string]: TSource }): IterableX<TSource> {
  return new OfValuesIterable<TSource>(source);
}
