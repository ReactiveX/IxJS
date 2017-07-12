import { AsyncIterableX } from '../asynciterable';
import { from } from './from';

class OfValuesAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: { [key: string]: TSource };

  constructor(source: { [key: string]: TSource }) {
    super();
    this._source = source;
  }

  [Symbol.asyncIterator]() {
    return from(Object.keys(this._source), key => this._source[key])[Symbol.asyncIterator]();
  }
}

export function ofValues<TSource>(source: { [key: string]: TSource }): AsyncIterableX<TSource> {
  return new OfValuesAsyncIterable<TSource>(source);
}
