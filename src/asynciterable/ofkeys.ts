import { AsyncIterableX } from '../asynciterable';

class OfKeysAsyncIterable<TSource> extends AsyncIterableX<string> {
  private _source: { [key: string]: TSource };

  constructor(source: { [key: string]: TSource }) {
    super();
    this._source = source;
  }

  [Symbol.asyncIterator]() {
    return AsyncIterableX.from<string, string>(Object.keys(this._source))[Symbol.asyncIterator]();
  }
}

export function ofKeys<TSource>(source: { [key: string]: TSource }): AsyncIterableX<string> {
  return new OfKeysAsyncIterable<TSource>(source);
}
