'use strict';

export function elementAt<T>(source: Iterable<T>, index: number) {
  for (let item of source) {
    if (index === 0) { return item; }
    index--;
  }
  return undefined;
}