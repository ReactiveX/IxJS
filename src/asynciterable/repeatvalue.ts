'use strict';

import { AsyncIterableX } from '../asynciterable';

class RepeatValueAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _value: TSource;
  private _count: number;

  constructor(value: TSource, count: number) {
    super();
    this._value = value;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    if (this._count === -1) {
      while (1) {
        yield this._value;
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        yield this._value;
      }
    }
  }
}

export function repeatValue<TSource>(value: TSource, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatValueAsyncIterable<TSource>(value, count);
}