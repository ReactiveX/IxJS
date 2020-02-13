import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';

export class MapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource, index: number) => Promise<TResult> | TResult;
  private _thisArg: any;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => Promise<TResult> | TResult,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._thisArg = thisArg;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (const item of <AsyncIterable<TSource>>this._source) {
      const result = await this._selector.call(this._thisArg, item, i++);
      yield result;
    }
  }
}

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => Promise<TResult> | TResult,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  return function mapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new MapAsyncIterable<TSource, TResult>(source, selector, thisArg);
  };
}
