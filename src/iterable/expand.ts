
import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class ExpandIterator<T> extends IteratorImpl<T> {
  private _q: Iterable<T>[];
  private _it: Iterator<T> | null;
  private _fn: (source: T) => Iterable<T>;

  constructor(source: Iterable<T>, fn: (source: T) => Iterable<T>) {
    super();
    this._q = [source];
    this._fn = fn;
    this._it = null;
  }

  _next() {
    while(1) {
      if (!this._it) {
        if (this._q.length === 0) { break; }
        this._it = this._q.shift()[Symbol.iterator]();
      }

      let innerNext = this._it.next();
      if (!innerNext.done) {
        this._q.push(this._fn(innerNext.value));
        return { done: false, value: innerNext.value };
      } else {
        this._it = null;
      }
    }
    return { done: true, value: undefined };
  }
}

export class ExpandIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>;
  private _fn: (source: T) => Iterable<T>

  constructor(source: Iterable<T>, fn: (source: T) => Iterable<T>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new ExpandIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function expand<T>(
    source: Iterable<T>,
    fn: (source: T) => Iterable<T>) {
  return new ExpandIterable<T>(source, fn);
}