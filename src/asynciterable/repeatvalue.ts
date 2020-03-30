import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

export class RepeatValueAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _value: TSource;
  private _count: number;

  constructor(value: TSource, count: number) {
    super();
    this._value = value;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    if (this._count === -1) {
      while (1) {
        throwIfAborted(signal);
        yield this._value;
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        throwIfAborted(signal);
        yield this._value;
      }
    }
  }
}

/**
 * Repeats a given value for the specified number of times as an async-iterable.
 * @param value The value to repeat as an async-iterable.
 * @param count The number of times to repeat the value, infinite if not specified.
 */
export function repeatValue<TSource>(value: TSource, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatValueAsyncIterable<TSource>(value, count);
}
