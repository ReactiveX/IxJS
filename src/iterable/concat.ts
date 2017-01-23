'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { $iterator$ } from '../symbol';
import { doneIterator } from '../internal/doneiterator';
import { ArrayIterable } from './arrayiterable';
import { FromIterable } from './from';
import { isIterable } from '../internal/isiterable';

class ConcatIterator<T> extends Iterator<T> {
  private _it: any;
  private _innerIt: any;

  constructor(it) {
    super();
    this._it = it;
    this._innerIt = null;
  }

  next() {
    let outerNext;
    while (1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { return { done: true, value: outerNext.value }; }
        
        let innerItem = outerNext.value;
        !isIterable(innerItem) || (innerItem = new FromIterable(innerItem));
        this._innerIt = innerItem[$iterator$]();
      }
      
      var innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        return { done: false, value: innerNext.value };
      }
    }    
  }
}

export class ConcatIterable<T> extends Iterable<T> {
  private _source: any;

  constructor(...args) {
    super();
    let len = args.length, source: any = new Array(len);
    for (let i = 0; i < len; i++) { source[i] = arguments[i]; }
    !args[$iterator$] && (source = new ArrayIterable(args));

    this._source = source;
  }

  [$iterator$]() {
    return new ConcatIterator(this._source[$iterator$]());
  }
}