import { IterableX } from './iterablex';

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

/**
 * Generates an iterable sequence of integral numbers within a specified range.
 *
 * @export
 * @param {number} start The value of the first integer in the sequence.
 * @param {number} count The number of sequential integers to generate.
 * @returns {IterableX<number>} An iterable sequence that contains a range of sequential integral numbers.
 */
export function range(start: number, count: number): IterableX<number> {
  return new RangeIterable(start, count);
}
