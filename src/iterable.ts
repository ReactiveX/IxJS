'use strict';

import { $iterator$ } from './symbol';
import { bindCallback } from './internal/bindcallback';

export abstract class Iterable<T> {
  [$iterator$]() {
    throw new Error('Must be implemented by implementing class');
  }

  forEach(fn, thisArg: any) {
    let i = 0, it = this[$iterator$](), next, fun = bindCallback(fn, thisArg, 2);
    while (!(next = it.next()).done) {
      fun(next.value, i++);
    }    
  }
}