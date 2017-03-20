'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { ConcatAllIterable } from './concatall';

class WhileIterator<T> extends Iterator<IIterable<T>> {
  private _source: IIterable<T>;
  private _fn: () => boolean;

  constructor(source: IIterable<T>, fn: () => boolean) {
    super();
    this._source = source;
    this._fn = fn;
  }

  next() {
    if (this._fn()) {
      return { done: false, value: this._source };
    } else {
      return { done: true, value: undefined };
    }
  }
}

class WhileIterable<T> extends Iterable<IIterable<T>> {
  private _source: IIterable<T>;
  private _fn: () => boolean;

  constructor(source: IIterable<T>, fn: () => boolean) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new WhileIterator(this._source, this._fn);
  }
}

export function _while<T>(
    source: IIterable<T>, 
    fn: () => boolean): Iterable<T> {
  return new ConcatAllIterable(new WhileIterable(source, fn));
}