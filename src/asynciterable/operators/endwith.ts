import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class EndWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _args: TSource[];

  constructor(source: AsyncIterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    for await (const item of wrapWithAbort(this._source, signal)) {
      yield item;
    }
    for (const item of this._args) {
      yield item;
    }
  }
}

/**
 * Append values to an async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {...TSource[]} args The values to append to the end of the async-iterable sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator which appends values to the end of the sequence.
 */
export function endWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function endsWithOperatorFunction(source) {
    return new EndWithAsyncIterable(source, args);
  };
}
