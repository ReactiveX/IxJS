import { AsyncIterableX } from '../asynciterablex';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

/** @ignore */
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
 * @returns The source sequence prepended with the specified values.
 */
export function startWith<TSource extends any[]>(...args: TSource) {
  return function startWithOperatorFunction<TInput>(
    source: AsyncIterable<TInput>
  ): AsyncIterableX<TInput | TSource[number & keyof TSource]> {
    return new StartWithAsyncIterable<TInput | TSource[number & keyof TSource]>(source, args);
  };
}
