import { AsyncIterableX } from './asynciterablex';
import { safeRace } from '../util/safeRace';

const NON_FLOWING = 0;
const READABLE = 1;
const ENDED = 2;
const ERRORED = 3;

export class ReadableStreamAsyncIterable extends AsyncIterableX<string | Buffer>
  implements AsyncIterator<string | Buffer> {
  private _stream: NodeJS.ReadableStream;
  private _defaultSize?: number;
  private _state: number;
  private _error: any;
  private _rejectFns: Set<(err: any) => void>;
  private _endPromise: Promise<void> | undefined;

  constructor(stream: NodeJS.ReadableStream, size?: number) {
    super();
    this._stream = stream;
    this._defaultSize = size;
    this._state = NON_FLOWING;
    this._error = null;
    this._rejectFns = new Set<(err: any) => void>();

    const onError = (err: any) => {
      this._state = ERRORED;
      this._error = err;
      for (const rejectFn of this._rejectFns) {
        rejectFn(err);
      }
    };

    const onEnd = () => {
      this._state = ENDED;
    };

    this._stream['once']('error', onError);
    this._stream['once']('end', onEnd);
  }

  [Symbol.asyncIterator](): AsyncIterator<string | Buffer> {
    return this;
  }

  async next(size = this._defaultSize): Promise<IteratorResult<string | Buffer>> {
    if (this._state === NON_FLOWING) {
      await safeRace([this._waitReadable(), this._waitEnd()]);
      return await this.next(size);
    }

    if (this._state === ENDED) {
      return ({ done: true, value: undefined } as any) as IteratorResult<string | Buffer>;
    }

    if (this._state === ERRORED) {
      throw this._error;
    }

    const value = this._stream['read'](size);
    if (value !== null) {
      return { done: false, value };
    } else {
      this._state = NON_FLOWING;
      return await this.next(size);
    }
  }

  private _waitReadable(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const onReadable = () => {
        this._state = READABLE;
        this._rejectFns.delete(reject);
        resolve();
      };

      this._rejectFns.add(reject);
      this._stream['once']('readable', onReadable);
    });
  }

  private _waitEnd(): Promise<void> {
    if (!this._endPromise) {
      this._endPromise = new Promise<void>((resolve, reject) => {
        const onEnd = () => {
          this._state = ENDED;
          this._rejectFns.delete(reject);
          resolve();
        };

        this._rejectFns.add(reject);
        this._stream['once']('end', onEnd);
      });
    }
    return this._endPromise;
  }
}

/**
 * Creates a new async-iterable from a Node.js stream.
 *
 * @param {NodeJS.ReadableStream} stream The Node.js stream to convert to an async-iterable.
 * @param {number} [size] The size of the buffers for the stream.
 * @returns {(AsyncIterableX<string | Buffer>)} An async-iterable containing data from the stream either in string or Buffer format.
 */
export function fromNodeStream(
  stream: NodeJS.ReadableStream,
  size?: number
): AsyncIterableX<string | Buffer> {
  return new ReadableStreamAsyncIterable(stream, size);
}
