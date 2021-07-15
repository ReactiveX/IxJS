import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class StartWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _args: TSource[];

  constructor(source: AsyncIterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for (const x of this._args) {
      yield x;
    }
    for await (const item of wrapWithAbort(this._source, signal)) {
      yield item;
    }
  }
}

/**
 * Prepend a value to an async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {...TSource[]} args Elements to prepend to the specified sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence prepended with the specified values.
 */
export function startWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function startWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new StartWithAsyncIterable<TSource>(source, args);
  };
}
