'use strict';

export function* range(start: number, count: number): Iterable<number> {
  for (let current = start, end = start + count; current < end; current++) {
    yield current;
  }
}