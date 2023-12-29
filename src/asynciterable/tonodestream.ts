import { BufferLike } from '../interfaces';
import { AsyncIterableX } from './asynciterablex';
import { Readable, ReadableOptions } from 'stream';

const done = async (_: any) => null as any;

type AsyncSourceIterator<TSource> = AsyncIterator<
  TSource,
  any,
  number | ArrayBufferView | undefined | null
>;

/** @ignore */
/** @ignore */
export class AsyncIterableReadable<T> extends Readable {
  private _pulling = false;
  private _objectMode = true;
  private _iterator: AsyncSourceIterator<T> | undefined;
  constructor(source: AsyncIterable<T>, options?: ReadableOptions) {
    super(options);
    this._iterator = source[Symbol.asyncIterator]();
    this._objectMode = !options || !!options.objectMode;
  }
  public _read(size: number) {
    const it = this._iterator;
    if (it && !this._pulling && (this._pulling = true)) {
      Promise.resolve(this._pull(it, size)).then((p) => (this._pulling = p));
    }
  }
  public _destroy(err: Error | null, cb: (err: Error | null) => void) {
    const it = this._iterator;
    this._iterator = undefined;
    const fn = (it && (err ? it.throw : it.return)) || done;
    fn.call(it, err).then(() => cb && cb(null));
  }
  // eslint-disable-next-line complexity
  async _pull(it: AsyncSourceIterator<T>, size: number) {
    let innerSize = size;
    const objectMode = this._objectMode;
    let r: IteratorResult<BufferLike | T> | undefined;
    while (this.readable && !(r = await it.next(innerSize)).done) {
      if (innerSize != null) {
        if (objectMode) {
          innerSize -= 1;
        } else {
          innerSize -= Buffer.byteLength(<BufferLike>r.value || '');
        }
      }
      if (!this.push(r.value) || innerSize <= 0) {
        break;
      }
    }
    if ((r && r.done) || !this.readable) {
      this.push(null);
      if (it.return) {
        await it.return();
      }
    }
    return !this.readable;
  }
}

/**
 * Converts an existing async-iterable to a Node.js stream.
 * @param source The async-iterable to convert to a Node.js stream.
 * @param options The optional Readable options for the Node.js stream.
 */
export function toNodeStream<TSource>(
  source: AsyncIterable<TSource>
): AsyncIterableReadable<TSource>;
export function toNodeStream<TSource>(
  source: AsyncIterable<TSource>,
  options: ReadableOptions & { objectMode: true }
): AsyncIterableReadable<TSource>;
export function toNodeStream<TSource extends BufferLike>(
  source: AsyncIterable<TSource>,
  options: ReadableOptions & { objectMode: false }
): AsyncIterableReadable<TSource>;
export function toNodeStream<TSource>(
  source: AsyncIterable<any>,
  options?: ReadableOptions
): AsyncIterableReadable<TSource> {
  return !options || options.objectMode === true
    ? new AsyncIterableReadable<TSource>(source, options)
    : new AsyncIterableReadable<TSource extends BufferLike ? TSource : any>(source, options);
}

/**
 * @ignore
 */
export function toNodeStreamProto<TSource>(
  this: AsyncIterable<TSource>
): AsyncIterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: AsyncIterable<TSource>,
  options: ReadableOptions & { objectMode: true }
): AsyncIterableReadable<TSource>;
export function toNodeStreamProto<TSource extends BufferLike>(
  this: AsyncIterable<TSource>,
  options: ReadableOptions & { objectMode: false }
): AsyncIterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: AsyncIterable<any>,
  options?: ReadableOptions
): AsyncIterableReadable<TSource> {
  return !options || options.objectMode === true
    ? new AsyncIterableReadable<TSource>(this, options)
    : new AsyncIterableReadable<TSource extends BufferLike ? TSource : any>(this, options);
}

AsyncIterableX.prototype.toNodeStream = toNodeStreamProto;

declare module '../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toNodeStream: typeof toNodeStreamProto;
  }
}
