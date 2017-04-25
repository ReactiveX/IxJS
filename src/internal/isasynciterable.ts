export function isAsyncIterable(x: any): x is AsyncIterable<any> {
  return x != null && Object(x) === x && typeof x[Symbol.asyncIterator] !== 'undefined';
}
