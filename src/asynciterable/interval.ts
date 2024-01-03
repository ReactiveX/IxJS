import { AsyncIterableX } from './asynciterablex.js';
import { sleep } from './_sleep.js';
import { throwIfAborted } from '../aborterror.js';

class IntervalAsyncIterable extends AsyncIterableX<number> {
  private _dueTime: number;

  constructor(dueTime: number) {
    super();
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let i = 0;
    while (1) {
      await sleep(this._dueTime, signal);
      yield i++;
    }
  }
}

/**
 * Produces a new item in an async-iterable at the given interval cycle time.
 *
 * @param {number} dueTime The due time in milliseconds to spawn a new item.
 * @returns {AsyncIterableX<number>} An async-iterable producing values at the specified interval.
 */
export function interval(dueTime: number): AsyncIterableX<number> {
  return new IntervalAsyncIterable(dueTime);
}
