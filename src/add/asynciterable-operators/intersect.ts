import { AsyncIterableX } from '../../asynciterable';
import { intersect } from '../../asynciterable/intersect';

export function intersectProto<T>(
    this: AsyncIterableX<T>,
    second: AsyncIterable<T>,
    comparer?: (x: T, y: T) => boolean) {
  return new AsyncIterableX(intersect(this, second, comparer));
}

AsyncIterableX.prototype.intersect = intersectProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    intersect: typeof intersectProto;
  }
}