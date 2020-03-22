import { AbortSignal } from '../abortsignal';
import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class EmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<TSource> {
    throwIfAborted(signal);
  }
}

export function empty<TSource>(): AsyncIterableX<TSource> {
  return new EmptyAsyncIterable<TSource>();
}
