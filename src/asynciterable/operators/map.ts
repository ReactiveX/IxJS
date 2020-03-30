import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class MapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _selector: (
    value: TSource,
    index: number,
    signal?: AbortSignal
  ) => Promise<TResult> | TResult;
  private _thisArg: any;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, index: number, signal?: AbortSignal) => Promise<TResult> | TResult,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._thisArg = thisArg;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let i = 0;
    for await (const item of wrapWithAbort(this._source, signal)) {
      const result = await this._selector.call(this._thisArg, item, i++, signal);
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
