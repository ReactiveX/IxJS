import { AsyncIterableX } from './asynciterablex';
import { sleep } from './_sleep';
import { throwIfAborted } from '../aborterror';

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
 * @param dueTime The interval time in milliseconds.
 */
export function interval(dueTime: number): AsyncIterableX<number> {
  return new IntervalAsyncIterable(dueTime);
}
