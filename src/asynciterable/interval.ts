import { AsyncIterableX } from './asynciterablex.js';
import { sleep } from './_sleep.js';
import { throwIfAborted } from '../aborterror.js';

class IntervalAsyncIterable extends AsyncIterableX<number> {
  private _dueTime: number;
  private _unref: boolean;

  constructor(dueTime: number, unref: boolean) {
    super();
    this._dueTime = dueTime;
    this._unref = unref;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    let i = 0;
    while (1) {
      await sleep(this._dueTime, signal, this._unref);
      yield i++;
    }
  }
}

/**
 * Produces a new item in an async-iterable at the given interval cycle time.
 *
 * @param {number} dueTime The due time in milliseconds to spawn a new item.
 * @param {boolean} [unref=false] Whether to unref the interval timer.
 * @returns {AsyncIterableX<number>} An async-iterable producing values at the specified interval.
 */
export function interval(dueTime: number, unref = false): AsyncIterableX<number> {
  return new IntervalAsyncIterable(dueTime, unref);
}
