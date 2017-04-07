'use strict';

export abstract class IteratorImpl<T> implements Iterator<T> {
  protected abstract create(): Iterator<T>;

  private _iterator?: Iterator<T>;

  private get iterator() {
    return this._iterator || (this._iterator = this.create());
  }

  [Symbol.iterator]() {
    return this;
  }

  next(value?: any): IteratorResult<T> {
    return this.iterator.next(value);
  }

  get return() { return this.iterator.return; }
  get throw() { return this.iterator.throw; }
}
