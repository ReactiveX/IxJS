'use strict';

export function arrayIndexOf<T>(array: T[], item: T, comparer: (a: T, b: T) => boolean) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (comparer(item, array[i])) { return i; }
  }
  return -1;
}