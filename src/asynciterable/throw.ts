'use strict';

export async function* _throw<T>(error: any): AsyncIterable<T> {
  throw error;
}