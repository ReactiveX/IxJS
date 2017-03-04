'use strict';

import { bindCallback } from './internal/bindcallback';

export abstract class AsyncIterable<T> {

  [Symbol.asyncIterator]() { 
    throw new Error('Must be implemented by implementing class');
  }

  forEachAsync(fn, thisArg) {
    const fun = bindCallback(fn, thisArg, 2);
    return new Promise(resolve => {
      const iter = this[Symbol.asyncIterator]();
      let i = 0;
      function next() {
        return iter.next().then(result => {
          if (result.done) {
            return result.value;
          }
          fun(result.value, i++);
          return next();
        });
      }
      resolve(next());
    });
  }
}
