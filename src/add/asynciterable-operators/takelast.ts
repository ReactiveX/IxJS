import { AsyncIterableX } from '../../asynciterable';
import { takeLast } from '../../asynciterable/takelast';

/**
 * @ignore
 */
export function takeLastProto<T>(
    this: AsyncIterableX<T>,
    count: number): AsyncIterableX<T> {
  return takeLast(this, count);
}

AsyncIterableX.prototype.takeLast = takeLastProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    takeLast: typeof takeLastProto;
  }
}