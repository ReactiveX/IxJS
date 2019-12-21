import { AsyncIterableX } from './asynciterablex';

export class OfAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _args: TSource[];

  constructor(args: TSource[]) {
    super();
    this._args = args;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this._args) {
      yield item;
    }
  }
}

/** @nocollapse */
export function of<TSource>(...args: TSource[]): AsyncIterableX<TSource> {
  //tslint:disable-next-line
  return new OfAsyncIterable<TSource>(args);
}
