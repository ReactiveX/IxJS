import { AsyncIterableX } from '../asynciterable';
import { sleep } from './_sleep';

class IntervalAsyncIterable extends AsyncIterableX<number> {
  private _dueTime: number;

  constructor(dueTime: number) {
    super();
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    while (1) {
      await sleep(this._dueTime);
      yield i++;
    }
  }
}

export function interval(dueTime: number): AsyncIterableX<number> {
  return new IntervalAsyncIterable(dueTime);
}