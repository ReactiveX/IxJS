import { IterableX } from '../iterable';
import { RefCountList } from './_refcountlist';
import { create } from './create';

class PublishedBuffer<T> extends IterableX<T> {
  private _buffer: RefCountList<T>;
  private _source: Iterator<T>;
  private _error: any;
  private _stopped: boolean = false;

  constructor(source: Iterator<T>) {
    super();
    this._source = source;
    this._buffer = new RefCountList<T>(0);
  }

  private *_getIterable(i: number): Iterable<T> {
    try {
      while (1) {
        let hasValue = false, current = <T>{};
        if (i >= this._buffer.count) {
          if (!this._stopped) {
            try {
              let next = this._source.next();
              hasValue = !next.done;
              if (hasValue) { current = next.value; }
            } catch (e) {
              this._error = e;
              this._stopped = true;
            }
          }

          if (this._stopped) {
            if (this._error) {
              throw this._error;
            } else {
              break;
            }
          }

          if (hasValue) { this._buffer.push(current); }
        } else {
          hasValue = true;
        }

        if (hasValue) {
          yield this._buffer.get(i);
        } else {
          break;
        }

        i++;
      }
    } finally {
      this._buffer.done();
    }
  }

  [Symbol.iterator](): Iterator<T> {
    this._buffer.readerCount++;
    return this._getIterable(this._buffer.count)[Symbol.iterator]();
  }
}

export function publish<TSource>(source: Iterable<TSource>): IterableX<TSource>;
export function publish<TSource, TResult>(
  source: Iterable<TSource>,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
export function publish<TSource, TResult>(
    source: Iterable<TSource>,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return selector ?
    create(() => selector(publish(source))[Symbol.iterator]()) :
    new PublishedBuffer<TSource>(source[Symbol.iterator]());
}
