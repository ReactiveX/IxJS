import { BufferLike } from '../interfaces';
import { IterableX } from '../iterable/iterablex';
import { Readable, ReadableOptions } from 'stream';

const done = (_: any) => null as any;

type SourceIterator<TSource> = Iterator<TSource, any, number | ArrayBufferView | undefined | null>;

export class IterableReadable<T> extends Readable {
  private _pulling: boolean = false;
  private _objectMode: boolean = true;
  private _iterator: SourceIterator<T> | undefined;
  constructor(source: Iterable<T>, options?: ReadableOptions) {
    super(options);
    this._iterator = source[Symbol.iterator]();
    this._objectMode = !options || !!options.objectMode;
  }
  public _read(size: number) {
    const it = this._iterator;
    if (it && !this._pulling && (this._pulling = true)) {
      this._pulling = this._pull(it, size);
    }
  }
  public _destroy(err: Error | null, cb: (err: Error | null) => void) {
    const it = this._iterator;
    this._iterator = undefined;
    const fn = (it && (err ? it.throw : it.return)) || done;
    fn.call(it, err);
    if (cb) {
      cb(null);
    }
  }
  // eslint-disable-next-line complexity
  _pull(it: SourceIterator<T>, size: number) {
    let innerSize = size;
    const objectMode = this._objectMode;
    let r: IteratorResult<BufferLike | T> | undefined;
    while (this.readable && !(r = it.next(innerSize)).done) {
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
        it.return();
      }
    }
    return !this.readable;
  }
}

export function toNodeStream<TSource>(source: Iterable<TSource>): IterableReadable<TSource>;
export function toNodeStream<TSource>(
  source: Iterable<TSource>,
  options: ReadableOptions & { objectMode: true }
): IterableReadable<TSource>;
export function toNodeStream<TSource extends BufferLike>(
  source: Iterable<TSource>,
  options: ReadableOptions & { objectMode: false }
): IterableReadable<TSource>;
export function toNodeStream<TSource>(
  source: Iterable<any>,
  options?: ReadableOptions
): IterableReadable<TSource> {
  return !options || options.objectMode === true
    ? new IterableReadable<TSource>(source, options)
    : new IterableReadable<TSource extends BufferLike ? TSource : any>(source, options);
}

/**
 * @ignore
 */
export function toNodeStreamProto<TSource>(this: Iterable<TSource>): IterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: Iterable<TSource>,
  options: ReadableOptions | { objectMode: true }
): IterableReadable<TSource>;
export function toNodeStreamProto<TSource extends BufferLike>(
  this: Iterable<TSource>,
  options: ReadableOptions | { objectMode: false }
): IterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: Iterable<any>,
  options?: ReadableOptions
): IterableReadable<TSource> {
  return !options || options.objectMode === true
    ? new IterableReadable<TSource>(this, options)
    : new IterableReadable<TSource extends BufferLike ? TSource : any>(this, options);
}

IterableX.prototype.toNodeStream = toNodeStreamProto;

declare module '../iterable/iterablex' {
  interface IterableX<T> {
    toNodeStream: typeof toNodeStreamProto;
  }
}
