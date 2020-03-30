import { AsyncIterableX } from '../asynciterablex';
import { sleep } from '../_sleep';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';
import { isObject } from '../../util/isiterable';

export class TimeoutError extends Error {
  constructor(message: string = 'Timeout has occurred') {
    super(message);
    Object.setPrototypeOf(this, TimeoutError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'TimeoutError';
  }

  get [Symbol.toStringTag]() {
    return 'TimeoutError';
  }
}

Object.defineProperty(TimeoutError, Symbol.hasInstance, {
  writable: true,
  configurable: true,
  value(x: any) {
    return (
      isObject(x) &&
      (x.constructor.name === 'TimeoutError' || x[Symbol.toStringTag] === 'TimeoutError')
    );
  },
});

const VALUE_TYPE = 'value';
const ERROR_TYPE = 'error';

interface TimeoutOperation<T> {
  type: string;
  value?: IteratorResult<T>;
}

export class TimeoutAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const it = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();
    while (1) {
      const { type, value } = await Promise.race<TimeoutOperation<TSource>>([
        it.next().then((val) => {
          return { type: VALUE_TYPE, val };
        }),
        sleep(this._dueTime, signal).then(() => {
          return { type: ERROR_TYPE };
        }),
      ]);

      if (type === ERROR_TYPE) {
        throw new TimeoutError();
      }

      if (!value || value.done) {
        break;
      }
      yield value.value;
    }
  }
}

export function timeout<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function timeoutOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TimeoutAsyncIterable<TSource>(source, dueTime);
  };
}
