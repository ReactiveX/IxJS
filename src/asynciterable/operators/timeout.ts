import { AsyncIterableX } from '../asynciterablex';
import { sleep } from '../_sleep';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';
import { isObject } from '../../util/isiterable';
import { safeRace } from '../../util/safeRace';
import { returnAsyncIterator } from '../../util/returniterator';

/** @ignore */
export class TimeoutError extends Error {
  constructor(message = 'Timeout has occurred') {
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

/** @ignore */
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
    try {
      while (1) {
        const { type, value } = await safeRace<TimeoutOperation<TSource>>([
          it.next().then((val) => {
            return { type: VALUE_TYPE, value: val };
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
    } finally {
      await returnAsyncIterator(it);
    }
  }
}

/**
 * Applies a timeout policy for each element in the async-iterable sequence.
 * If the next element isn't received within the specified timeout duration starting from its predecessor, a TimeoutError is thrown.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} dueTime Maximum duration in milliseconds between values before a timeout occurs.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence with a TimeoutError in case of a timeout.
 */
export function timeout<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function timeoutOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TimeoutAsyncIterable<TSource>(source, dueTime);
  };
}
