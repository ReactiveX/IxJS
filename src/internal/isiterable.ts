/**
 * @ignore
 */
export function isArrayLike(x: any): x is ArrayLike<any> {
  return x != null && Object(x) === x && typeof x['length'] === 'number';
}

/**
 * @ignore
 */
export function isIterable(x: any): x is Iterable<any> {
  return x != null && Object(x) === x && typeof x[Symbol.iterator] !== 'undefined';
}

/**
 * @ignore
 */
export function isAsyncIterable(x: any): x is AsyncIterable<any> {
  return x != null && Object(x) === x && typeof x[Symbol.asyncIterator] !== 'undefined';
}
