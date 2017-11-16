import { Readable } from 'stream';
import { AsyncIterableX } from './asynciterablex';

const NON_FLOWING = 0;
const READABLE = 1;
const ENDED = 2;
const ERRORED = 3;

export class ReadableStreamAsyncIterable extends AsyncIterableX<string | Buffer>
  implements AsyncIterator<string | Buffer> {
  private _stream: Readable;
  private _size?: number;
  private _state: number;
  private _error: any;
  private _rejectFns: Set<(err: any) => void>;

  constructor(stream: Readable, size?: number) {
    super();
    this._stream = stream;
    this._size = size;
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

  async next(): Promise<IteratorResult<string | Buffer>> {
    if (this._state === NON_FLOWING) {
      await Promise.race([this._waitReadable(), this._waitEnd()]);
      return this.next();
    }

    if (this._state === ENDED) {
      return ({ done: true, value: undefined } as any) as IteratorResult<string | Buffer>;
    }

    if (this._state === ERRORED) {
      throw this._error;
    }

    const read = this._stream['read'](this._size);
    if (read !== null) {
      return { done: false, value: <string | Buffer>read };
    } else {
      this._state = NON_FLOWING;
      return this.next();
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
    return new Promise<void>((resolve, reject) => {
      const onEnd = () => {
        this._state = ENDED;
        this._rejectFns.delete(reject);
        resolve();
      };

      this._rejectFns.add(reject);
      this._stream['once']('end', onEnd);
    });
  }
}

export function fromNodeStream(stream: Readable, size?: number): AsyncIterableX<string | Buffer> {
  return new ReadableStreamAsyncIterable(stream, size);
}
