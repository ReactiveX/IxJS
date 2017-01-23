'use strict';

import { $asyncIterator$ } from './symbol';
import { bindCallback } from './internal/bindcallback';

export abstract class AsyncIterable<T> {

  [$asyncIterator$]() { 
    throw new Error('Must be implemented by implementing class');
  }

  forEachAsync(fn, thisArg) {
    const cb = bindCallback(fn, thisArg, 2);
    let i = 0, e = this[$asyncIterator$](), p;
    const recurse = function () {
      p = e.next().then(function (result) {
        if (!result.done) {
          cb(result.value, i++);
          recurse();
        } else {
          Promise.resolve();
        }
      });
    };

    recurse();

    return p;    
  }
}
