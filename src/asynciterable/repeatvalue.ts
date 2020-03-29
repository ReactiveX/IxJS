import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from 'ix/aborterror';

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

export function repeatValue<TSource>(value: TSource, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatValueAsyncIterable<TSource>(value, count);
}
