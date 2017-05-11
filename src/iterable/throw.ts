'use strict';

export function* _throw<T>(error: any): Iterable<T> {
  throw error;
}