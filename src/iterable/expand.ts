import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class ExpandIterator<T> extends Iterator<T> {
  private _q: IIterable<T>[];
  private _it: IIterator<T>;
  private _fn: (source: T) => IIterable<T>;

  constructor(source: IIterable<T>, fn: (source: T) => IIterable<T>) {
    super();
    this._q = [source];
    this._fn = fn;
    this._it = null;
  }

  next() {
    while(1) {
      if (!this._it) {
        if (this._q.length === 0) { return { done: true, value: undefined }; }
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
  }
}

export class ExpandIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _fn: (source: T) => IIterable<T>

  constructor(source: IIterable<T>, fn: (source: T) => IIterable<T>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new ExpandIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function expand<T>(
    source: IIterable<T>,
    fn: (source: T) => IIterable<T>) {
  return new ExpandIterable<T>(source, fn);
}