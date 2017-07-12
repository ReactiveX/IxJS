import { AsyncIterableX } from '../asynciterable';
import { from } from './from';

function makeTuple<TFirst, TSecond>(x: TFirst, y: TSecond): [TFirst, TSecond] {
  return [x, y];
}

class OfEntriesAsyncIterable<TSource> extends AsyncIterableX<[string, TSource]> {
  private _source: { [key: string]: TSource };

  constructor(source: { [key: string]: TSource }) {
    super();
    this._source = source;
  }

  [Symbol.asyncIterator]() {
    return from(Object.keys(this._source), key => makeTuple(key, this._source[key]))[Symbol.asyncIterator]();
  }
}

export function ofEntries<TSource>(source: { [key: string]: TSource }): AsyncIterableX<[string, TSource]> {
  return new OfEntriesAsyncIterable<TSource>(source);
}
