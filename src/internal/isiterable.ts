export function isIterable(x: any): x is Iterable<any> {
  return x != null && Object(x) === x && typeof x[Symbol.iterator] !== 'undefined';
}
