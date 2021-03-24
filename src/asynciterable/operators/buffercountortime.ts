import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX, interval } from '../';
import { map } from './map';
import { MergeAsyncIterable } from '../merge';
import { wrapWithAbort } from './withabort';

const timerEvent = '__internal_timer_event__' as const;

class BufferCountOrTime<TSource> extends AsyncIterableX<TSource[]> {
  constructor(
    private readonly source: AsyncIterable<TSource>,
    private readonly bufferSize: number,
    private readonly maxWaitTime: number
  ) {
    super();
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const buffer: TSource[] = [];
    const timer = interval(this.maxWaitTime).pipe(map(() => timerEvent));
    const merged = new MergeAsyncIterable<TSource | typeof timerEvent>(
      [timer, this.source],
      // we want this merge to end when the source ends
      // so we set the min active to 1
      1
    );

    for await (const item of wrapWithAbort(merged, signal)) {
      if (item !== timerEvent) {
        buffer.push(item);
      }
      if (buffer.length >= this.bufferSize || (buffer.length && item === timerEvent)) {
        yield buffer.slice();
        buffer.length = 0;
      }
    }

    if (buffer.length) {
      yield buffer;
    }
  }
}

/**
 * Projects each element of an async-iterable sequence into consecutive buffers
 * which are emitted when either the threshold count or time is met.
 *
 * @export
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
