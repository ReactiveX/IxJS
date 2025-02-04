import { OperatorAsyncFunction } from '../../interfaces.js';
import { AsyncIterableX, concat, of } from '../index.js';
import { merge } from '../merge.js';
import { wrapWithAbort } from './withabort.js';
import { AsyncSink } from '../asyncsink.js';

const timerEvent = Symbol('BufferCountOrTime:TimerEvent');
const endedEvent = Symbol('BufferCountOrTime:EndedEvent');

class BufferCountOrTime<TSource> extends AsyncIterableX<TSource[]> {
  constructor(
    private readonly _source: AsyncIterable<TSource>,
    private readonly _bufferSize: number,
    private readonly _maxWaitTime: number
  ) {
    super();
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const buffer: TSource[] = [];

    const timeoutSink = new AsyncSink<typeof timerEvent>();
    const merged = merge(concat(this._source, of(endedEvent)), timeoutSink);

    let timeout: NodeJS.Timeout | undefined;

    try {
      for await (const item of wrapWithAbort(merged, signal)) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeoutSink.write(timerEvent);
          }, this._maxWaitTime);
        }

        if (item === endedEvent) {
          break;
        }

        if (item !== timerEvent) {
          buffer.push(item);
        }

        if (buffer.length >= this._bufferSize || (item === timerEvent && buffer.length > 0)) {
          clearTimeout(timeout);
          timeout = undefined;

          yield buffer.slice();
          buffer.length = 0;
        }
      }

      if (buffer.length) {
        yield buffer;
      }
    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }
}

/**
 * Projects each element of an async-iterable sequence into consecutive buffers
 * which are emitted when either the threshold count or time is met.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {number} count The size of the buffer.
 * @param {number} time The threshold number of milliseconds to wait before flushing a non-full buffer
 * @returns {OperatorAsyncFunction<TSource, TSource[]>} An operator which returns an async-iterable sequence
 * of buffers
 */
export function bufferCountOrTime<TSource>(
  count: number,
  time: number
): OperatorAsyncFunction<TSource, TSource[]> {
  return function bufferOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new BufferCountOrTime<TSource>(source, count, time);
  };
}
