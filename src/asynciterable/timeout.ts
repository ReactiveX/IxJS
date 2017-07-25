import { AsyncIterableX } from '../asynciterable';
import { sleep } from './_sleep';

export class TimeoutError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, TimeoutError.prototype);
    this.message = 'Timeout has occurred';
  }
}

const VALUE_TYPE = 'value';
const ERROR_TYPE = 'error';

interface TimeoutOperation<T> {
  type: string;
  value?: IteratorResult<T>;
}

class TimeoutAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator]() {
    const it = this._source[Symbol.asyncIterator]();
    while (1) {
      const { type, value } = await Promise.race<TimeoutOperation<TSource>>([
        it.next().then(value => { return { type: VALUE_TYPE, value }; }),
        sleep(this._dueTime).then(() => { return { type: ERROR_TYPE }; })
      ]);

      if (type === ERROR_TYPE) {
        throw new TimeoutError();
      }

      if (value.done) { break; }
      yield value.value;
    }
  }
}

export function timeout<TSource>(
    source: AsyncIterable<TSource>,
    dueTime: number): AsyncIterableX<TSource> {
  return new TimeoutAsyncIterable<TSource>(source, dueTime);
}