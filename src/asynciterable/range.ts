'use strict';

export async function* range(start: number, count: number): AsyncIterable<number> {
  for (let current = start, end = start + count; current < end; current++) {
    yield current;
  }
}