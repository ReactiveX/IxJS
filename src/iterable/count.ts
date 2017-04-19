'use strict';

export function count<T>(    source: Iterable<T>,    fn: (value: T) => boolean = () => true): number {
  let i = 0;

  for (let item of source) {
    if (fn(item)) {
      i++;
    }
  }

  return i;
}