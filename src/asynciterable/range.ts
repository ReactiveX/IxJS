import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class RangeAsyncIterable extends AsyncIterableX<number> {
  private _start: number;
  private _count: number;

  constructor(start: number, count: number) {
    super();
    this._start = start;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for (let current = this._start, end = this._start + this._count; current < end; current++) {
      yield current;
    }
  }
}

/**
 * Generates an async-iterable sequence of integral numbers within a specified range.
 *
 * @param {number} start The value of the first integer in the sequence.
 * @param {number} count The number of sequential integers to generate.
 * @returns {AsyncIterableX<number>} An async-iterable sequence that contains a range of sequential integral numbers.
 */
export function range(start: number, count: number): AsyncIterableX<number> {
  return new RangeAsyncIterable(start, count);
}
