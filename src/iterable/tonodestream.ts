import { BufferLike } from '../interfaces';
import { Readable, ReadableOptions } from 'stream';

const done = (_: any) => null as any;

export class IterableReadable<T> extends Readable {
  private _pulling: boolean = false;
  private _objectMode: boolean = true;
  private _iterator: Iterator<T> | undefined;
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
  _pull(it: Iterator<T>, size: number) {
    const objectMode = this._objectMode;
    let r: IteratorResult<BufferLike | T> | undefined;
    while (this.readable && !(r = it.next(size)).done) {
      if (size != null) {
        if (objectMode) {
          size -= 1;
        } else {
          size -= Buffer.byteLength(<BufferLike>r.value || '');
        }
      }
      if (!this.push(r.value) || size <= 0) {
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
