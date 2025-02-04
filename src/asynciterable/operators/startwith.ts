import { AsyncIterableX } from '../asynciterablex.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

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

    for await (const item of this._args) {
      yield item;
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
export function startWith<TSource extends any[]>(
  ...args: TSource
): <TInput>(
  source: AsyncIterable<TInput>
) => AsyncIterableX<TInput | TSource[number & keyof TSource]> {
  return function startWithOperatorFunction(source) {
    return new StartWithAsyncIterable(source, args);
  };
}
