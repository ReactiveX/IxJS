import { AsyncIterableX } from '../asynciterable';

class RangeAsyncIterable extends AsyncIterableX<number> {
  private _start: number;
  private _count: number;

  constructor(start: number, count: number) {
    super();
    this._start = start;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    for (let current = this._start, end = this._start + this._count; current < end; current++) {
      yield current;
    }
  }
}

export function range(start: number, count: number): AsyncIterableX<number> {
  return new RangeAsyncIterable(start, count);
}
