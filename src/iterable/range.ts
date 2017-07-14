import { IterableX } from '../iterable';

class RangeIterable extends IterableX<number> {
  private _start: number;
  private _count: number;

  constructor(start: number, count: number) {
    super();
    this._start = start;
    this._count = count;
  }

  *[Symbol.iterator]() {
    for (let current = this._start, end = this._start + this._count; current < end; current++) {
      yield current;
    }
  }
}

export function range(start: number, count: number): IterableX<number> {
  return new RangeIterable(start, count);
}
