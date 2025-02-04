import { OperatorAsyncFunction } from '../../interfaces.js';
import { AsyncIterableX, concat, of } from '../index.js';
import { merge } from '../merge.js';
import { wrapWithAbort } from './withabort.js';
import { AsyncSink } from '../asyncsink.js';
import type { bufferCountOrTime } from './buffercountortime.js'; // Used only in jsdoc
import { sleep } from '../_sleep.js';

const timeoutEvent = Symbol('BufferCountWithDebounce:TimeoutEvent');
const endedEvent = Symbol('BufferCountWithDebounce:EndedEvent');

class BufferCountWithDebounce<TSource> extends AsyncIterableX<TSource[]> {
  constructor(
    private readonly _source: AsyncIterable<TSource>,
    private readonly _bufferSize: number,
    private readonly _maxWaitTime: number
  ) {
    super();
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const buffer: TSource[] = [];

    const timeoutSink = new AsyncSink<typeof timeoutEvent>();
    const merged = merge(concat(this._source, of(endedEvent)), timeoutSink);

    let abortController: AbortController | undefined;

    try {
      for await (const item of wrapWithAbort(merged, signal)) {
        if (!abortController) {
          abortController = new AbortController();

          sleep(this._maxWaitTime, abortController.signal, true)
            .then(() => {
              timeoutSink.write(timeoutEvent);
            })
            .catch(() => {
              // Ignore the error if the abort signal is triggered
            });
        }

        if (item === endedEvent) {
          break;
        }

        if (item !== timeoutEvent) {
          buffer.push(item);
        }

        if (buffer.length >= this._bufferSize || (item === timeoutEvent && buffer.length > 0)) {
          abortController.abort();
          abortController = undefined;

          yield buffer.slice();
          buffer.length = 0;
        }
      }

      if (buffer.length) {
        yield buffer;
      }
    } finally {
      abortController?.abort();
    }
  }
}

/**
 * Projects each element of an async-iterable sequence into consecutive buffers
 * which are emitted when either the threshold count or time is met.
 *
 * @see https://github.com/ReactiveX/IxJS/pull/380 for the difference between {@link bufferCountOrTime} and {@link bufferCountWithDebounce}.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {number} count The size of the buffer.
 * @param {number} time The threshold number of milliseconds to wait before flushing a non-full buffer
 * @returns {OperatorAsyncFunction<TSource, TSource[]>} An operator which returns an async-iterable sequence
 * of buffers
 */
export function bufferCountWithDebounce<TSource>(
  count: number,
  time: number
): OperatorAsyncFunction<TSource, TSource[]> {
  return function bufferOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new BufferCountWithDebounce<TSource>(source, count, time);
  };
}
