'use strict';

export function* _finally<TSource>(
    source: Iterable<TSource>,
    action: () => void) {
  try {
    for (let item of source) {
      yield item;
    }
  } finally {
    action();
  }
}